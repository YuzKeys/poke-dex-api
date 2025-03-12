import React, { useEffect, useState } from "react";
import Card from "./card.jsx";
import Pokeinfo from "./pokeinfo.jsx";
import axios from "axios";

const Main = () => {
    const [pokeData, setPokedata] = useState([]);
    const [loading, setLoading] = useState(true);
    const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
    const [nextUrl, setNextUrl] = useState(null);
    const [previousUrl, setPreviousUrl] = useState(null);
    const [pokeDex, setPokeDex] = useState(null);

    // Fonction pour récupérer la liste des Pokémon
    const pokeFun = async () => {
        setLoading(true);
        try {
            const res = await axios.get(url);
            setNextUrl(res.data.next);
            setPreviousUrl(res.data.previous);

            if (res.data.results) {
                await getPokemon(res.data.results);
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des Pokémon :", error);
        } finally {
            setLoading(false);
        }
    };

    // Fonction pour récupérer les détails de chaque Pokémon
    const getPokemon = async (pokemonList) => {
        try {
            const pokemonDetails = await Promise.all(
                pokemonList.map(async (pokemon) => {
                    const result = await axios.get(pokemon.url);
                    return result.data;
                })
            );
            setPokedata(pokemonDetails);
            if (pokemonDetails.length > 0) {
                setPokeDex(pokemonDetails[0]);
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des détails des Pokémon :", error);
        }
    };

    // Gère la navigation entre les pages
    const handleNavigation = (newUrl) => {
        if (newUrl) {
            setUrl(newUrl);
        }
    };

    // Exécuter pokeFun() à chaque changement d'URL
    useEffect(() => {
        pokeFun();
    }, [url]);

    return (
        <>
            <div className="container">
                <div className="left-content">
                    <Card
                        pokemon={pokeData}
                        loading={loading}
                        infoPokemon={(poke) => setPokeDex(poke)}
                    />
                    <div className="btn-group">
                        {previousUrl && (
                            <button onClick={() => handleNavigation(previousUrl)}>Previous</button>
                        )}
                        {nextUrl && (
                            <button onClick={() => handleNavigation(nextUrl)}>Next</button>
                        )}
                    </div>
                </div>

                <div className="right-content">
                    <Pokeinfo data={pokeDex} />
                </div>
            </div>
        </>
    );
};

export default Main;
