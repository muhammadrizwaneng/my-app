

// import type { Metadata } from 'next'
// import LeftNavigation from '../components/LeftNavigation'


// export const metadata: Metadata = {
//   title: 'Seebiz | Home ',
// }

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
   
//     <div className="" id="main_container">
//     <div className="main-wrapper">
//          <LeftNavigation/>
//          {/* <Suspense fallback={<Loading />}> */}
//          <div className='color-fafafa flex-1'>
//          {/* <div className='w-1170 mx-auto min-vh'> */}
//             {children}
//         {/* </Suspense> */}
//         {/* {children} */}
//           {/* </div> */}
//          </div>
//     </div>
//     </div>
   
//   )
// }

import type { Metadata } from 'next';
import LeftNavigation from '../components/LeftNavigation';

export const metadata: Metadata = {
  title: 'Seebiz | Home ',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div id="main_container" >
      <LeftNavigation />
      <div>
        {children}
      </div>
    </div>
  );
}
