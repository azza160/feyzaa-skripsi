import { cn } from "../lib/utils"

const SidebarLinkAdmin = ({ href, icon: Icon, children, isActive = false, className = "" }) => {
  return (
    <a
      href={href}
      className={cn(
        "flex items-center p-2 text-sm rounded-lg transition-colors",
        isActive ? "bg-blue-100 text-blue-700 font-medium" : "text-gray-700 hover:bg-gray-100",
        className,
      )}
    >
      {Icon && <Icon className={cn("w-5 h-5 mr-3", isActive ? "text-blue-700" : "text-gray-500")} />}
      {children}
    </a>
  )
}

export default SidebarLinkAdmin
