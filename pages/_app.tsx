import '../lib/firebase'
import '../styles/globals.css'
import '../lib/firebase'
import '../hooks/authentication'
import { RecoilRoot } from 'recoil'

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  )
}

export default MyApp
