import '../styles/PlusBox.scss'

export const PlusBox = ({ description, icon }) => {
     return (
          <div className="card">
               {icon}
               {description}
          </div>
     );
};
