
type Props = {
label: String;
onClick?: () => void;
size: 1 | 2 | 3;

}
export const Button = ({label, onClick, size}: Props) => {
return (
    <div onClick={onClick}
    className={`flex justify-center items-center cursor-pointer bg-white text-black font-bold rounded-3xl
        ${size === 1 && 'w-full h-14 text-lg' }
        ${size === 2 && 'w-full h-10 text-md' }
        ${size === 3 && 'w-full h-7 text-xs' }`}
    >
      {label}
    </div>
)
}