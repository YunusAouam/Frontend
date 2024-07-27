import { Outlet } from "react-router-dom"
import SimpleSidebar from "../components/dashboard/SimpleSideBar";
export default function RootLayout() {
  return (
      <SimpleSidebar>
          <Outlet />
      </SimpleSidebar>
  )
}
