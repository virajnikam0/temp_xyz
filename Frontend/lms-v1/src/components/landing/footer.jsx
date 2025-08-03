// import React from 'react'

// export default function Footer() {
//   return (
//     <div className='landing-footer'>
//       <h1>Footer</h1>
//     </div>
//   )
// }


// footer.jsx
import React from 'react';

export default function Footer() {
  return (
    <div className="landing-footer text-center py-4">
      <p>© {new Date().getFullYear()} ClassNest. All rights reserved.</p>
      <p><a href="mailto:support@yourplatform.com">support@ClassNest.com</a></p>
    </div>
  );
}
