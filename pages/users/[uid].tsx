import { collection, doc, getDoc, getFirestore } from 'firebase/firestore'
import { getMiddlewareRouteMatcher } from 'next/dist/shared/lib/router/utils/middleware-route-matcher'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
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
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-light mb-3"
        style={{ backgroundColor: '#e3f2fd' }}
      >
        <div className="container">
          <div className="mr-auto">
            <a className="navbar-brand" href="#">
              Navbar
            </a>
          </div>
          <form className="d-flex">
            <button className="btn btn-outline-primary" type="submit">
              Search
            </button>
          </form>
        </div>
      </nav>
      <div className="container">
        {user && (
          <div className="text-center">
            <h1 className="h4">
              {user.name}さんのページ
            </h1>
            <div className="m-5">
              {user.name}さんに質問しよう！
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

