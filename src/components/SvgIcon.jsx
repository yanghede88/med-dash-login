const SvgIcon = ({ iconName, size = 20, onClick }) => {
  const url = new URL(`../assets/${iconName}.svg`, import.meta.url).href
  return (
    <div
      className="flex justify-between items-center bg-slate-200 p-1 rounded-md cursor-pointer hover:bg-slate-300 transition"
      onClick={onClick}
    >
      <img src={url} alt={iconName} width={size} height={size} />
    </div>
  )
}

export default SvgIcon;
