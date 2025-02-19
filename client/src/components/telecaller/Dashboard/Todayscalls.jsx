import React, { useEffect } from 'react'

const Todayscalls = ({telecallerdata,dailystats}) => {
  useEffect(()=>{
    console.log("👏😍😍😍😍",telecallerdata)
  },[telecallerdata])
 
  return (
 <div className="lg:w-[70%] bg-gray-700 pt-5 mt-5 rounded-2xl p-4 md:p-8">
            <h3 className="text-white text-xl font-bold">Today's Calls</h3>
            <h4 className="text-white mt-2">Call summary</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
              <div className="rounded-2xl p-4 bg-black">
                <div className="mt-5 ml-6">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M39 10L20 1L1 10V30L20 39L39 30V10Z"
                      stroke="#FEB95A"
                      stroke-width="2.5"
                      stroke-linejoin="round"
                    />
                    <g transform="translate(10, 13)">
                      <path
                        d="M1 7.5V10M10 5V10V5ZM19 1V10V1Z"
                        stroke="#FEB95A"
                        stroke-width="2.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </g>
                  </svg>
                </div>
                <div className="ml-6 mt-7 space-y-2">
                  <div className="text-white font-bold text-2xl">{dailystats.totalcalls||0}</div>
                  <div className="text-white font-bold">Total calls</div>
                  <div className="text-yellow-600">+10% from yesterday</div>
                </div>
              </div>
              <div className="rounded-2xl p-4 bg-black">
                <div className="mt-5 ml-6">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21.6485 16.3664L18.255 15.9789C17.44 15.8854 16.6384 16.166 16.0639 16.7405L13.6056 19.1987C9.82467 17.2749 6.7251 14.1886 4.80123 10.3943L7.27287 7.92266C7.84736 7.34816 8.12792 6.54655 8.0344 5.73157L7.64696 2.36477C7.48663 1.01538 6.35101 0 4.98827 0H2.67695C1.16725 0 -0.0886137 1.25587 0.00490785 2.76558C0.713 14.1753 9.83803 23.287 21.2343 23.9951C22.744 24.0886 23.9999 22.8327 23.9999 21.323V19.0117C24.0132 17.6623 22.9979 16.5267 21.6485 16.3664Z"
                      fill="#A9DFD8"
                    />
                  </svg>
                </div>
                <div className="ml-6 mt-7 space-y-2">
                  <div className="text-white font-bold  text-2xl">{dailystats.answeredcalls||0}</div>
                  <div className="text-white font-bold">Answered</div>
                  <div className="text-blue-200 ">+8% from yesterday</div>
                </div>
              </div>
              <div className="rounded-2xl p-4 bg-black">
                <div className="mt-5 ml-6">
                  <svg
                    width="55"
                    height="40"
                    viewBox="0 0 35 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.5 3.386C15.1667 3.386 12.9063 3.80926 10.7917 4.60497V9.85327C10.7917 10.5135 10.4563 11.1061 9.975 11.377C8.54583 12.2065 7.24792 13.2731 6.09583 14.509C5.83333 14.8138 5.46875 14.9831 5.075 14.9831C4.66667 14.9831 4.30208 14.7968 4.03958 14.4921L0.422917 10.2935C0.160417 10.0056 0 9.58239 0 9.10835C0 8.63431 0.160417 8.21106 0.422917 7.90632C4.87083 3.01354 10.8792 0 17.5 0C24.1208 0 30.1292 3.01354 34.5771 7.90632C34.8396 8.21106 35 8.63431 35 9.10835C35 9.58239 34.8396 10.0056 34.5771 10.3104L30.9604 14.509C30.6979 14.8138 30.3333 15 29.925 15C29.5313 15 29.1667 14.8138 28.9042 14.526C27.7521 13.2731 26.4396 12.2235 25.0104 11.3939C24.5292 11.123 24.1938 10.5474 24.1938 9.8702V4.6219C22.0938 3.80925 19.8333 3.386 17.5 3.386Z"
                      fill="#F2C8ED"
                    />
                  </svg>
                </div>
                <div className="ml-6 mt-7 space-y-2">
                  <div className="text-white font-bold  text-2xl">{dailystats.notansweredcalls||0}</div>
                  <div className="text-white font-bold">Not answered</div>
                  <div className="text-rose-200 ">+2% from yesterday</div>
                </div>
              </div>
              <div className="rounded-2xl p-4 bg-black">
                <div className="mt-5 ml-6">
                  {" "}
                  <svg
                    width="40"
                    height="20"
                    viewBox="0 0 18 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 12C13.4183 12 17 9.53757 17 6.5C17 3.46243 13.4183 1 9 1C4.58172 1 1 3.46243 1 6.5C1 9.53757 4.58172 12 9 12Z"
                      stroke="#20AEF3"
                      stroke-width="1.5"
                    />
                  </svg>
                  <svg
                    width="90"
                    height="30"
                    viewBox="0 0 50 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22.0718 4.33333H32M23.7265 11H4.31013C3.84083 11.0001 3.37687 10.9331 2.94905 10.8036C2.52123 10.674 2.13933 10.4849 1.8287 10.2487C1.51806 10.0124 1.28581 9.73456 1.14734 9.43346C1.00886 9.13236 0.967348 8.81492 1.02554 8.50222L1.67088 5.03111C1.82095 4.22469 2.4046 3.48287 3.31207 2.94513C4.21954 2.4074 5.3883 2.1108 6.59859 2.11111H7.1794L23.7265 11ZM27.0359 1V7.66667V1Z"
                      stroke="#20AEF3"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                <div className="ml-6 mt-7 space-y-2">
                  <div className="text-white font-bold  text-2xl">{dailystats.confirmed||0}</div>
                  <div className="text-white font-bold">Confirmed</div>
                  <div className="text-blue-600 ">+3% from yesterday</div>
                </div>
              </div>
            </div>
          </div>  )
}

export default Todayscalls