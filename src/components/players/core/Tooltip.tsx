const ToolTip = ({ children, text }: { children: JSX.Element; text: string }) => {
  return (
    <>
      <div className="group">{children}</div>
      <div
        role="tooltip"
        className="absolute z-10 invisible group-hover:visible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
      >
        {text}
        <div className="tooltip-arrow" data-popper-arrow></div>
      </div>
    </>
  )
}
export default ToolTip
