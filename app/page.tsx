import AuthForm from './auth-form'

export default function Home() {
  return (
    <div className="row">
      <div className="col-6 logo">
        <img src="images/cardinal-logo-transparent.png" alt="cardinal basketball logo" width="100%"/>
      </div>
      <div className="col-6 auth-widget">
        <AuthForm />
      </div>
    </div>
  )
}