import cl from "./NoContacts.module.scss";
export const NoContacts = ({ text }: { text: string }) => {
  return (
    <div className={cl.wrapper}>
      <div className={cl.text}>{text}</div>
    </div>
  );
};
