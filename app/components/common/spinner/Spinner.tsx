import "./Spinner.scss";

export const Spinner = ({ sm, button, white, customClass }: { sm?: boolean; button?: boolean; white?: boolean; customClass?: string }) => {
  return (
    <div className={`spinner ${sm ? "small" : ""} ${button ? "button" : ""} ${white ? "white" : ""} ${customClass || ""}`}>
      <span />
    </div>
  )
}
