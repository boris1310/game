'use client'

import {useEffect, useState} from "react";
import {Button} from "@nextui-org/button";
import {HeartFilledIcon} from "@/components/icons";

const initialState = [
    {id: 1, clicked: false},
    {id: 2, clicked: false},
    {id: 3, clicked: false},
    {id: 4, clicked: false},
    {id: 5, clicked: false},
    {id: 6, clicked: false},
    {id: 7, clicked: false},
    {id: 8, clicked: false},
    {id: 9, clicked: false},
];

export default function Home() {
    const [timer, setTimer] = useState(0);
    const [items, setItems] = useState(initialState);
    const [isWon, setIsWon] = useState(false);

    useEffect(() => {
        if (!isWon) {
            const interval = setInterval(() => setTimer((value) => value + 1), 1000);
            return () => clearInterval(interval);
        }
    }, [isWon]);

    useEffect(() => {
        if (items.every(item => item.clicked)) {
            setIsWon(true);
        }
    }, [items]);

    const handleClick = (id: number) => {
        if (isWon) return;

        setItems((prevItems) =>
            prevItems.map((item) => item.id === id ? {...item, clicked: !item.clicked} : item)
        );
    };

    const startGame = () => {
        setIsWon(false);
        setItems(initialState);
        setTimer(0);
    };

    return (
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
            {isWon ? (
                <div className="flex items-center text-lg">
                    Юлечка, ты победила за {timer} секунд!
                    <HeartFilledIcon className="mx-2" color="red"/>
                </div>
            ) : (
                <p className="text-lg">Нажми все красные квадратики!</p>
            )}

            {!isWon && (
                <div className="grid grid-cols-3 gap-4">
                    {items.map(({id, clicked}) => (
                        <Button
                            key={id}
                            variant="shadow"
                            className={`w-[100px] h-[100px] ${clicked ? "bg-success" : "bg-danger"} text-white rounded flex items-center justify-center cursor-pointer`}
                            onClick={() => handleClick(id)}
                        >
                            {id}
                        </Button>
                    ))}
                </div>
            )}

            {isWon && (
                <Button
                    className="w-[330px] h-[330px] bg-danger text-xl text-white"
                    onClick={startGame}
                >
                    Играть снова
                </Button>
            )}

            <div className="text-xl mt-4">Время: {timer} сек.</div>
        </section>
    );
}
