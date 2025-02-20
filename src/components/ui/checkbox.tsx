type props = {
    value?: string
    onChange?: (newValue: string) => void
    checked?: boolean
    onclick?: () => void
}
export const Checkbox = ({ value, onChange, checked, onclick }: props) => {

    return (
        <div className="w-full flex items-center p-2 gap-3">
            <input
                type="checkbox"
                value={value}
                onChange={e => onChange && onChange(e.target.value)}
                className="border-2 border-white"
                onClick={onclick}
                checked={checked}
            />
            <label>Manter logado</label>
        </div>
    )
}