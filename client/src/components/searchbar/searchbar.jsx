import "./searchbar.css";

function Searchbar({handleChange, handleSubmit}) {
    return ( 
        <div>
            <form onChange={(event) => handleChange(event)}>
                <input placeholder="Nombre del pokemon" type="search" />
                <button type="submit" onClick={handleSubmit}>Buscar</button>
            </form>
        </div>
    );
}

export default Searchbar;