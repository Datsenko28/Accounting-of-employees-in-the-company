import './app-info.css';


const AppInfo = ({increased, employees}) => {
    return (
        <div>
            <div className="app-info">
                <h1>Облік співробітників в компанії</h1>
                <h2>Загальна кількість співробітників: {employees}</h2>
                <h2>Премію отримають: {increased}</h2>
            </div>
        </div>
    );
};

export default AppInfo;