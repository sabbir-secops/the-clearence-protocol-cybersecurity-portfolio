"use client";



import {



  useLayoutEffect,



  useRef,



} from "react";





import { gsap } from "gsap";



import { ScrollTrigger } from "gsap/ScrollTrigger";



gsap.registerPlugin(ScrollTrigger);



type HeroSectionProps = {



  active: boolean;



};



export default function HeroSection({



  active,



}: HeroSectionProps) {



  const sectionRef =



    useRef<HTMLElement | null>(null);



  const contentRef =



    useRef<HTMLDivElement | null>(null);



  const coreRef =



    useRef<HTMLDivElement | null>(null);



  useLayoutEffect(() => {



    if (!active) return;



    const section =



      sectionRef.current;



    if (!section) return;



    const reduceMotion =



      window.matchMedia(



        "(prefers-reduced-motion: reduce)"



      ).matches;



    if (reduceMotion) {



      return;



    }



    const ctx = gsap.context(



      () => {



        const timeline =



          gsap.timeline({



            defaults: {



              ease: "power3.out",



            },



          });



        /*



         * Essential text stays visible.



         * We only animate position.



         */



        timeline



          .from(



            ".hero-clearance-label",



            {



              y: 14,



              duration: 0.45,



            }



          )



          .from(



            ".hero-heading-line",



            {



              y: 45,



              duration: 0.75,



              stagger: 0.07,



            },



            "-=0.15"



          )



          .from(



            ".hero-description",



            {



              y: 22,



              duration: 0.6,



            },



            "-=0.35"



          )



          .from(



            ".hero-actions",



            {



              y: 18,



              duration: 0.55,



            },



            "-=0.3"



          )



          .from(



            coreRef.current,



            {



              scale: 0.9,



              rotate: -2,



              duration: 1,



            },



            "-=0.8"



          );



        if (



          contentRef.current



        ) {



          gsap.to(



            contentRef.current,



            {



              y: -35,



              scrollTrigger: {



                trigger: section,



                start:



                  "60% center",



                end:



                  "bottom top",



                scrub: 1,



              },



            }



          );



        }



        if (



          coreRef.current



        ) {



          gsap.to(



            coreRef.current,



            {



              scale: 1.06,



              yPercent: 3,



              scrollTrigger: {



                trigger: section,



                start:



                  "top top",



                end:



                  "bottom top",



                scrub: 1,



              },



            }



          );



        }



        ScrollTrigger.refresh();



      },



      section



    );



    return () => {



      ctx.revert();



    };



  }, [active]);



  return (



    <section



      ref={sectionRef}



      id="hero"



      className="



        grid-bg



        relative



        overflow-hidden



        border-b



        border-white/[0.08]



        bg-[#080b0f]



        pb-16



        pt-[104px]



        sm:pb-20



        sm:pt-[118px]



        xl:flex



        xl:min-h-screen



        xl:items-center



        xl:pb-12



        xl:pt-[88px]



      "



    >



      {/* AMBIENT */}



      <div



        aria-hidden="true"



        className="



          pointer-events-none



          absolute



          right-[-40%]



          top-[5%]



          h-[520px]



          w-[520px]



          rounded-full



          bg-cyan-400/[0.055]



          blur-[120px]



          sm:right-[-20%]



          sm:h-[650px]



          sm:w-[650px]



          xl:right-[-12%]



          xl:h-[800px]



          xl:w-[800px]



        "



      />



      <div



        aria-hidden="true"



        className="



          pointer-events-none



          absolute



          bottom-[-20%]



          left-[-30%]



          h-[480px]



          w-[480px]



          rounded-full



          bg-blue-500/[0.035]



          blur-[130px]



        "



      />



      <div



        className="



          container-shell



          hero-layout



          relative



          z-10



          grid



          min-w-0



          gap-10



          sm:gap-12



          xl:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]



          xl:items-center



          xl:gap-4



        "



      >



        {/* LEFT CONTENT */}



        <div



          ref={contentRef}



          className="



            relative



            z-20



            min-w-0



            max-w-[780px]



          "



        >



          <div



            className="



              hero-clearance-label



              mb-5



              flex



              items-center



              gap-3



            "



          >



            <span className="status-dot" />



            <p className="system-label">



              Clearance 01 |



              Identity



            </p>



          </div>



          <h1



            className="



              hero-title



              min-w-0



              max-w-full



              text-[#eef5f8]



            "



            style={{



              fontSize:



                "clamp(2.4rem, 5.25vw, 6.5rem)",



              lineHeight: 0.96,



              letterSpacing:



                "-0.055em",



              wordBreak:



                "normal",



              overflowWrap:



                "normal",



            }}



          >



            <span



              className="



                hero-heading-line



                block



                whitespace-nowrap



              "



            >



              Cybersecurity



            </span>



            <span



              className="



                hero-heading-line



                block



                whitespace-nowrap



              "



            >



              Product



            </span>



            <span



              className="



                hero-heading-line



                block



                whitespace-nowrap



              "



            >



              Engineer



            </span>



          </h1>



          <p



            className="



              hero-description



              mt-7



              max-w-[580px]



              text-[16px]



              leading-7



              text-[#a8b4bd]



              sm:text-[18px]



              sm:leading-8



            "



          >



            I engineer secure



            digital products,



            resilient



            infrastructure, and



            intelligent web



            systems.



          </p>



          <div



            className="



              hero-actions



              mt-7



              flex



              flex-col



              gap-3



              min-[420px]:flex-row



              min-[420px]:flex-wrap



            "



          >



            <a



              href="#identity"



              className="



                primary-btn



                w-full



                min-[420px]:w-auto



              "



            >



              Enter System



              <span



                aria-hidden="true"



                className="



                  ml-3



                  text-cyan-200



                "



              >



                ↘



              </span>



            </a>



            <a



              href="#archive"



              className="



                secondary-btn



                w-full



                min-[420px]:w-auto



              "



            >



              Explore Archive



            </a>



          </div>



          <div



            className="



              hero-domain-list



              mt-8



              flex



              max-w-[700px]



              flex-wrap



              gap-x-3



              gap-y-2



            "



          >



            {[



              "Security",



              "Product Engineering",



              "Infrastructure",



              "Web Technology",



            ].map(



              (



                domain,



                index



              ) => (



                <div



                  key={domain}



                  className="



                    flex



                    items-center



                    gap-3



                  "



                >



                  {index > 0 && (



                    <span



                      className="



                        hidden



                        text-white/25



                        sm:inline



                      "



                    >



                      /



                    </span>



                  )}



                  <span className="tiny-mono">



                    {domain}



                  </span>



                </div>



              )



            )}



          </div>



        </div>



        {/* CORE */}



        <div



          id="system-core-anchor"



          ref={coreRef}



          className="



            relative



            z-10



            flex



            min-w-0



            items-center



            justify-center



            min-h-[360px]



            min-[430px]:min-h-[390px]



            sm:min-h-[460px]



            md:min-h-[500px]



            lg:min-h-[540px]



            xl:min-h-[680px]



          "



        >



          {/* BACK PLATES */}



          <div



            aria-hidden="true"



            className="



              pointer-events-none



              absolute



              left-1/2



              top-1/2



              h-[72%]



              w-[72%]



              -translate-x-1/2



              -translate-y-1/2



              rounded-full



              border



              border-cyan-300/[0.07]



            "



          />



          <div



            aria-hidden="true"



            className="



              pointer-events-none



              absolute



              left-1/2



              top-1/2



              h-[92%]



              w-[92%]



              -translate-x-1/2



              -translate-y-1/2



              rounded-full



              border



              border-white/[0.04]



            "



          />



          {/* CONNECTED LAYER LABELS */}



          <div



            className="



              hero-core-label



              pointer-events-none



              absolute



              left-0



              top-[18%]



              z-20



              flex



              items-center



              min-[430px]:left-[1%]



              min-[430px]:top-[20%]



              sm:left-[2%]



              sm:top-[21%]



              2xl:left-[2%]



              2xl:top-[22%]



            "



          >



            <div className="text-right">



              <p



                className="



                  font-mono



                  text-[9px]



                  tracking-[0.12em]



                  text-white/45



                  uppercase



                  sm:text-[10px]



                "



              >



                Layer 01



              </p>



              <p



                className="



                  mt-1



                  font-mono



                  text-[10px]



                  tracking-[0.08em]



                  text-[#7dc9e6]/85



                  uppercase



                  min-[430px]:text-[11px]



                  sm:tracking-[0.12em]



                  2xl:mt-1.5



                  2xl:tracking-[0.14em]



                "



              >



                Infrastructure



              </p>



            </div>



            <span



              aria-hidden="true"



              className="



                mx-2



                h-px



                w-[26px]



                bg-gradient-to-r



                from-[#7dc9e6]/45



                to-[#7dc9e6]/15



                min-[430px]:w-[38px]



                sm:mx-3



                sm:w-[58px]



                lg:w-[70px]



                2xl:w-[clamp(72px,5vw,100px)]



              "



            />



            <span



              aria-hidden="true"



              className="



                h-2



                w-2



                shrink-0



                rounded-full



                border



                border-[#7dc9e6]/60



                bg-[#7dc9e6]/20



                shadow-[0_0_14px_rgba(125,201,230,0.25)]



              "



            />



          </div>



          <div



            className="



              hero-core-label



              pointer-events-none



              absolute



              right-0



              top-[31%]



              z-20



              flex



              items-center



              min-[430px]:right-[1%]



              min-[430px]:top-[32%]



              sm:right-[2%]



              2xl:right-[2%]



            "



          >



            <span



              aria-hidden="true"



              className="



                h-2



                w-2



                shrink-0



                rounded-full



                border



                border-[#55ddff]/65



                bg-[#55ddff]/20



                shadow-[0_0_14px_rgba(85,221,255,0.28)]



              "



            />



            <span



              aria-hidden="true"



              className="



                mx-2



                h-px



                w-[30px]



                bg-gradient-to-r



                from-[#55ddff]/15



                to-[#55ddff]/50



                min-[430px]:w-[42px]



                sm:mx-3



                sm:w-[62px]



                lg:w-[76px]



                2xl:w-[clamp(82px,5.4vw,108px)]



              "



            />



            <div>



              <p



                className="



                  font-mono



                  text-[9px]



                  tracking-[0.12em]



                  text-white/45



                  uppercase



                  sm:text-[10px]



                "



              >



                Layer 02



              </p>



              <p



                className="



                  mt-1



                  font-mono



                  text-[10px]



                  tracking-[0.08em]



                  text-cyan-100/85



                  uppercase



                  min-[430px]:text-[11px]



                  sm:tracking-[0.12em]



                  2xl:mt-1.5



                  2xl:tracking-[0.14em]



                "



              >



                Security



              </p>



            </div>



          </div>



          <div



            className="



              hero-core-label



              pointer-events-none



              absolute



              left-0



              top-[55%]



              z-20



              flex



              items-center



              min-[430px]:left-[1%]



              min-[430px]:top-[54%]



              sm:left-[3%]



              sm:top-[50%]



              2xl:top-[46%]



            "



          >



            <div className="text-right">



              <p



                className="



                  font-mono



                  text-[9px]



                  tracking-[0.12em]



                  text-white/45



                  uppercase



                  sm:text-[10px]



                "



              >



                Layer 03



              </p>



              <p



                className="



                  mt-1



                  font-mono



                  text-[10px]



                  tracking-[0.08em]



                  text-violet-200/85



                  uppercase



                  min-[430px]:text-[11px]



                  sm:tracking-[0.12em]



                  2xl:mt-1.5



                  2xl:tracking-[0.14em]



                "



              >



                Intelligence



              </p>



            </div>



            <span



              aria-hidden="true"



              className="



                mx-2



                h-px



                w-[34px]



                bg-gradient-to-r



                from-violet-300/45



                to-violet-300/15



                min-[430px]:w-[48px]



                sm:mx-3



                sm:w-[74px]



                lg:w-[92px]



                2xl:w-[clamp(106px,7vw,142px)]



              "



            />



            <span



              aria-hidden="true"



              className="



                h-2



                w-2



                shrink-0



                rounded-full



                border



                border-violet-300/60



                bg-violet-300/20



                shadow-[0_0_14px_rgba(167,139,250,0.24)]



              "



            />



          </div>



          <div



            className="



              hero-core-label



              pointer-events-none



              absolute



              right-0



              top-[68%]



              z-20



              flex



              items-center



              min-[430px]:right-[1%]



              min-[430px]:top-[67%]



              sm:right-[3%]



              sm:top-[62%]



              2xl:top-[57%]



            "



          >



            <span



              aria-hidden="true"



              className="



                h-2



                w-2



                shrink-0



                rounded-full



                border



                border-white/65



                bg-white/20



                shadow-[0_0_14px_rgba(223,248,255,0.2)]



              "



            />



            <span



              aria-hidden="true"



              className="



                mx-2



                h-px



                w-[38px]



                bg-gradient-to-r



                from-white/10



                to-white/45



                min-[430px]:w-[52px]



                sm:mx-3



                sm:w-[82px]



                lg:w-[104px]



                2xl:w-[clamp(132px,8vw,170px)]



              "



            />



            <div>



              <p



                className="



                  font-mono



                  text-[9px]



                  tracking-[0.12em]



                  text-white/45



                  uppercase



                  sm:text-[10px]



                "



              >



                Layer 04



              </p>



              <p



                className="



                  mt-1



                  font-mono



                  text-[10px]



                  tracking-[0.08em]



                  text-white/85



                  uppercase



                  min-[430px]:text-[11px]



                  sm:tracking-[0.12em]



                  2xl:mt-1.5



                  2xl:tracking-[0.14em]



                "



              >



                Product Core



              </p>



            </div>



          </div>



          {/* PERSISTENT CORE ANCHOR */}



          <div

            aria-hidden="true"

            className="

              hero-persistent-core-space

              pointer-events-none

              relative

              h-full

              min-h-[320px]

              min-w-0

              w-full



              min-[375px]:min-h-[350px]

              min-[430px]:min-h-[390px]

              sm:min-h-[440px]

              md:min-h-[500px]

              lg:min-h-[540px]

              xl:min-h-[620px]

              2xl:min-h-[690px]

            "

          />



        </div>



        {/* MOBILE STATUS */}



        <div



          className="



            hero-mobile-status



            flex



            min-w-0



            flex-col



            gap-4



            border-t



            border-white/[0.08]



            pt-5



            sm:flex-row



            sm:items-center



            sm:justify-between



            xl:hidden



          "



        >



          <div



            className="



              flex



              items-center



              gap-3



            "



          >



            <span className="status-dot" />



            <span className="tiny-mono">



              System Online



            </span>



          </div>



          <span className="tiny-mono">



            Clearance | Public



          </span>



        </div>



      </div>



      {/* DESKTOP HUD */}



      <div



        className="



          pointer-events-none



          absolute



          bottom-6



          left-0



          z-20



          hidden



          w-full



          xl:block



        "



      >



        <div



          className="



            container-shell



            flex



            items-center



            justify-between



          "



        >



          <div



            className="



              flex



              items-center



              gap-3



            "



          >



            <span className="status-dot" />



            <span className="tiny-mono">



              System Online



            </span>



          </div>



          <div



            className="



              flex



              items-center



              gap-3



            "



          >



            <span className="tiny-mono">



              Scroll to increase



              clearance



            </span>



            <span className="text-cyan-200">



              ↓



            </span>



          </div>



          <span className="tiny-mono">



            Clearance | Public



          </span>



        </div>



      </div>



    </section>



  );



}