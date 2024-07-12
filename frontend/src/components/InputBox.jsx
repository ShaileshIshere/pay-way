export const InputBox = ({ onChange, label, placeholder }) => {
    return <div>
        <div className="text-lg font-medium text-left py-2">
            { label }
        </div>
        <input onChange={onChange} type="text" placeholder={placeholder} className="w-full px-2 py-1 border rounded border-slate-200" />
    </div>
}