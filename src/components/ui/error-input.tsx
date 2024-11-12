type Props = {
  text: string
}

export const ErrorInput = ({text}: Props) =>{
   return (
    <div className="w-full">
       <p className="text-red-500">{text}</p>
   </div>
   )
}