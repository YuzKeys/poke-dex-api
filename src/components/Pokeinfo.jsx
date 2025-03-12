const Pokeinfo = ({ data }) => {
    if (!data) return <p>Aucun Pokémon sélectionné. Veuillez en choisir un.</p>; // Message si `data` est null

    return (
        <div className="poke-info">
            <h1>{data.name}</h1>
            {data.sprites?.other?.dream_world?.front_default && (
                <img src={data.sprites.other.dream_world.front_default} alt={data.name} />
            )}

            <div className="abilities">
                {data.abilities?.map((ability, index) => (
                    <div className="group" key={index}>
                        <h2>{ability?.ability?.name}</h2>
                    </div>
                ))}
            </div>

            <div className="base-stats">
                {data.stats?.map((stat) => (
                    <h3 key={stat.stat.name}>
                        {stat.stat.name}: {stat.base_stat}
                    </h3>
                ))}
            </div>
        </div>
    );
};

export default Pokeinfo;
