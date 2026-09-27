import {
  NextResponse,
} from "next/server";

type ContactPayload = {
  identity?: unknown;
  email?: unknown;
  message?: unknown;
  website?: unknown;
};

type FormSubmitResponse = {
  success?: boolean | string;
  message?: string;
};

type RateEntry = {
  count: number;
  resetAt: number;
};

type RateStoreGlobal =
  typeof globalThis & {
    contactRateStore?: Map<
      string,
      RateEntry
    >;
  };

function isContactPayload(
  value: unknown
): value is ContactPayload {
  return (
    typeof value ===
      "object" &&
    value !==
      null &&
    !Array.isArray(
      value
    )
  );
}

const FORM_DESTINATION =
  "contact@buildwithsabbir.com";

const FORM_SUBMIT_ENDPOINT = [
  "https:",
  "",
  "formsubmit.co",
  "ajax",
  FORM_DESTINATION,
].join("/");

const SITE_ORIGIN = [
  "https:",
  "",
  "buildwithsabbir.com",
].join("/");

const FORM_PAGE_URL =
  `${SITE_ORIGIN}/#contact`;

const RATE_WINDOW_MS =
  10 * 60 * 1000;

const RATE_LIMIT =
  5;

const MAX_BODY_BYTES =
  16000;

const RATE_STORE_CLEANUP_THRESHOLD =
  512;

const globalRateStore =
  globalThis as
    RateStoreGlobal;

const rateStore =
  globalRateStore
    .contactRateStore ??
  new Map<
    string,
    RateEntry
  >();

globalRateStore
  .contactRateStore =
  rateStore;

function normalizeText(
  value: unknown
) {
  if (
    typeof value !==
    "string"
  ) {
    return "";
  }

  return value
    .replace(
      /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g,
      ""
    )
    .trim();
}

function getClientKey(
  request: Request
) {
  const forwarded =
    request.headers.get(
      "x-forwarded-for"
    );

  if (forwarded) {
    const firstAddress =
      forwarded
        .split(",")[0]
        ?.trim();

    if (firstAddress) {
      return firstAddress;
    }
  }

  const realIp =
    request.headers.get(
      "x-real-ip"
    )?.trim();

  return (
    realIp ||
    "unknown"
  );
}

function cleanupRateStore(
  now: number
) {
  if (
    rateStore.size <
    RATE_STORE_CLEANUP_THRESHOLD
  ) {
    return;
  }

  for (
    const [
      key,
      entry,
    ] of rateStore
  ) {
    if (
      entry.resetAt <=
      now
    ) {
      rateStore.delete(
        key
      );
    }
  }
}

function isRateLimited(
  key: string
) {
  const now =
    Date.now();

  cleanupRateStore(
    now
  );

  const existing =
    rateStore.get(
      key
    );

  if (
    !existing ||
    existing.resetAt <=
      now
  ) {
    rateStore.set(
      key,
      {
        count: 1,
        resetAt:
          now +
          RATE_WINDOW_MS,
      }
    );

    return false;
  }

  if (
    existing.count >=
    RATE_LIMIT
  ) {
    return true;
  }

  existing.count +=
    1;

  rateStore.set(
    key,
    existing
  );

  return false;
}

function isSameOrigin(
  request: Request
) {
  const fetchSite =
    request.headers.get(
      "sec-fetch-site"
    );

  if (
    fetchSite &&
    fetchSite !==
      "same-origin" &&
    fetchSite !==
      "same-site" &&
    fetchSite !==
      "none"
  ) {
    return false;
  }

  const origin =
    request.headers.get(
      "origin"
    );

  if (!origin) {
    return true;
  }

  const forwardedHost =
    request.headers.get(
      "x-forwarded-host"
    );

  const host =
    forwardedHost
      ?.split(",")[0]
      ?.trim() ||
    request.headers.get(
      "host"
    )?.trim();

  if (!host) {
    return false;
  }

  try {
    return (
      new URL(
        origin
      ).host ===
      host
    );
  } catch {
    return false;
  }
}

function json(
  body: {
    success: boolean;
    activationRequired?: boolean;
    message: string;
  },
  status = 200,
  headers?: HeadersInit
) {
  return NextResponse.json(
    body,
    {
      status,
      headers: {
        "Cache-Control":
          "no-store",
        ...headers,
      },
    }
  );
}

function isValidEmail(
  value: string
) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    value
  );
}

export async function POST(
  request: Request
) {
  if (
    !isSameOrigin(
      request
    )
  ) {
    return json(
      {
        success:
          false,
        message:
          "Request origin rejected.",
      },
      403
    );
  }

  const contentType =
    request.headers.get(
      "content-type"
    ) ??
    "";

  if (
    !contentType
      .toLowerCase()
      .includes(
        "application/json"
      )
  ) {
    return json(
      {
        success:
          false,
        message:
          "Unsupported request format.",
      },
      415
    );
  }

  const contentLength =
    Number(
      request.headers.get(
        "content-length"
      ) ??
      "0"
    );

  if (
    Number.isFinite(
      contentLength
    ) &&
    contentLength >
      MAX_BODY_BYTES
  ) {
    return json(
      {
        success:
          false,
        message:
          "Request too large.",
      },
      413
    );
  }

  const clientKey =
    getClientKey(
      request
    );

  if (
    isRateLimited(
      clientKey
    )
  ) {
    return json(
      {
        success:
          false,
        message:
          "Too many requests. Please try again later.",
      },
      429,
      {
        "Retry-After":
          "600",
      }
    );
  }

  try {
    const rawBody =
      await request.text();

    const actualBodyBytes =
      new TextEncoder()
        .encode(
          rawBody
        )
        .byteLength;

    if (
      actualBodyBytes >
      MAX_BODY_BYTES
    ) {
      return json(
        {
          success:
            false,
          message:
            "Request too large.",
        },
        413
      );
    }

    let parsedBody:
      unknown;

    try {
      parsedBody =
        JSON.parse(
          rawBody
        );
    } catch {
      return json(
        {
          success:
            false,
          message:
            "Invalid request body.",
        },
        400
      );
    }

    if (
      !isContactPayload(
        parsedBody
      )
    ) {
      return json(
        {
          success:
            false,
          message:
            "Invalid request body.",
        },
        400
      );
    }

    const body =
      parsedBody;

    const identity =
      normalizeText(
        body.identity
      );

    const email =
      normalizeText(
        body.email
      );

    const message =
      normalizeText(
        body.message
      );

    const website =
      normalizeText(
        body.website
      );

    if (website) {
      return json(
        {
          success: true,
          message:
            "Message accepted.",
        }
      );
    }

    if (
      identity.length <
        2 ||
      identity.length >
        100
    ) {
      return json(
        {
          success:
            false,
          message:
            "Invalid identity.",
        },
        400
      );
    }

    if (
      email.length >
        254 ||
      !isValidEmail(
        email
      )
    ) {
      return json(
        {
          success:
            false,
          message:
            "Invalid email address.",
        },
        400
      );
    }

    if (
      message.length <
        10 ||
      message.length >
        5000
    ) {
      return json(
        {
          success:
            false,
          message:
            "Invalid message length.",
        },
        400
      );
    }

    const formBody =
      new URLSearchParams();

    formBody.set(
      "name",
      identity
    );

    formBody.set(
      "email",
      email
    );

    formBody.set(
      "_replyto",
      email
    );

    formBody.set(
      "message",
      message
    );

    formBody.set(
      "_subject",
      `Portfolio Contact | ${identity}`
    );

    formBody.set(
      "_template",
      "table"
    );

    formBody.set(
      "_captcha",
      "false"
    );

    formBody.set(
      "_url",
      FORM_PAGE_URL
    );

    formBody.set(
      "source",
      "buildwithsabbir.com"
    );

    const controller =
      new AbortController();

    const timeout =
      setTimeout(
        () => {
          controller.abort();
        },
        15000
      );

    try {
      const response =
        await fetch(
          FORM_SUBMIT_ENDPOINT,
          {
            method:
              "POST",
            headers: {
              Accept:
                "application/json",
              "Content-Type":
                "application/x-www-form-urlencoded; charset=UTF-8",
              Origin:
                SITE_ORIGIN,
              Referer:
                `${SITE_ORIGIN}/`,
            },
            body:
              formBody.toString(),
            signal:
              controller.signal,
            cache:
              "no-store",
          }
        );

      const rawText =
        await response.text();

      let result:
        | FormSubmitResponse
        | null =
          null;

      try {
        result =
          JSON.parse(
            rawText
          ) as
            FormSubmitResponse;
      } catch {
        result =
          null;
      }

      const rejected =
        result?.success ===
          false ||
        result?.success ===
          "false";

      if (
        !response.ok ||
        rejected
      ) {
        const providerMessage =
          result?.message ??
          rawText.trim();

        const activationRequired =
          /activat|confirm/i.test(
            providerMessage
          );

        return json(
          {
            success:
              false,
            activationRequired,
            message:
              activationRequired
                ? "Form activation is required."
                : "Message could not be delivered. Please retry.",
          },
          502
        );
      }

      return json(
        {
          success: true,
          message:
            "Message delivered.",
        }
      );
    } finally {
      clearTimeout(
        timeout
      );
    }
  } catch (
    error
  ) {
    const isAbort =
      error instanceof
        Error &&
      error.name ===
        "AbortError";

    return json(
      {
        success:
          false,
        message:
          isAbort
            ? "Delivery service timed out. Please retry."
            : "Server error. Please retry.",
      },
      isAbort
        ? 504
        : 500
    );
  }
}