import AuthForm from "./AuthForm"
import NavPills from "./NavPills"

const Auth = () => {
  return (
    <div>
      <div className="w-100 p-4 d-flex justify-content-center pb-4">
        <div style={{width: "26rem"}}>
          <NavPills/>
          <AuthForm/>
        </div>
      </div>
    </div>
  )
}

export default Auth