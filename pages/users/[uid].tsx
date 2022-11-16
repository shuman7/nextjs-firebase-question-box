import { collection, doc, getDoc, getFirestore } from 'firebase/firestore'
import { getMiddlewareRouteMatcher } from 'next/dist/shared/lib/router/utils/middleware-route-matcher'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { User } from '../../models/User'

type Query = {
  uid: string
}

export default function UserShow() {
  const [user, setUser] = useState<User>(null)
  const router = useRouter()
  const query = router.query as Query

  useEffect(() => {
    if(query.uid === undefined) {
      return
    }
    async function loadUser() {
      console.log(query)
      const db = getFirestore()
      const ref = doc(collection(db, 'users'), query.uid)
      const userDoc = await getDoc(ref)

      if (!userDoc.exists()) {
        console.log('returned')
        return
      }

      const gotUser = userDoc.data() as User
      gotUser.uid = userDoc.id
      setUser(gotUser)
    }
    loadUser()
  }, [query.uid])

  return (
    <Layout>
      {user && (
        <div className="text-center">
          <h1 className="h4">{user.name}さんのページ</h1>
          <div className="m-5">{user.name}さんに質問しよう！</div>
        </div>
      )}
        <div className="row justify-content-center mb-3">
          <div className="col-12 col-md-6">
          <form>
              <textarea 
                className="form-control"
                placeholder="お元気ですか?"
                rows={6}
                required
                ></textarea>
                <div className="m-3">
                  <button type='submit' className='btn btn-primary'>
                    質問を送信する
                  </button>
                </div>
          </form>  
          </div>
        </div>
    </Layout>
  )
}

