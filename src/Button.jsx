export default function Button({disabled, id, children, className, onClick}) {
    return (
        <button disabled={disabled} id={id} onClick={onClick} className={className}>{children}</button>
    )
}