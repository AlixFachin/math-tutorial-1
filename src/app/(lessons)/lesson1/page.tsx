'use client';

import { Mafs, Line, Coordinates, useMovablePoint, Theme } from 'mafs';
import { vec } from 'mafs';
import { Vector } from 'mafs';
import { Transform } from 'mafs';
import { useState } from 'react';

import HelpCard from '../HelpCard';

import 'mafs/core.css';

function gcd(a: number, b: number): number {
    if (!b) return a;
    return gcd(b, a % b);
}

function displayRatio(a: number, b: number): string {
    if (a % b === 0) {
        return `${a / b}`;
    }
    if (b === 0) {
        return 'DIV0!!!';
    }
    const g = gcd(a, b);

    return `${a / g} / ${b / g}`;
}

function integerConstraint([x, y]: vec.Vector2): vec.Vector2 {
    return [Math.round(x), Math.round(y)];
}

function vertConstraint([x, y]: vec.Vector2): vec.Vector2 {
    return [0, Math.round(y)];
}

export default function Lesson1() {
    const pointSlope = useMovablePoint([1, 1], {
        constrain: integerConstraint,
    });

    const pointIntercept = useMovablePoint([0, 0], {
        constrain: vertConstraint,
        color: Theme.blue,
    });

    const [isSlopeHelpVisible, setSlopeHelpVisible] = useState(false);

    const toggleHelpVisible = () => {
        setSlopeHelpVisible((currentValue) => !currentValue);
    };

    const HelpDescription = (
        <p>
            Move the <span className="text-blue-600">blue</span> dot to change
            the y intercept, and the <span className="text-pink-600">pink</span>{' '}
            dot to move the line slope.
            <br />
            Look at how the line equation changes.
        </p>
    );

    return (
        <div className="flex flex-col justify-evenly p-4">
            <h1 className="mb-4 self-center text-3xl text-orange-700">
                Line Coordinates Basics
            </h1>
            <HelpCard title="Usage" description={HelpDescription} />
            <div className="card border-1 my-8 mb-4 max-w-md self-center rounded-lg border-gray-600 p-2 shadow-lg">
                <p>
                    The line has{' '}
                    <span className="mx-2 text-green-600">{pointSlope.y} </span>{' '}
                    /
                    <span className="mx-2 text-yellow-400">{pointSlope.x}</span>
                    <span
                        className="mx-2 rounded-[50%] bg-gray-400 px-2"
                        onClick={toggleHelpVisible}
                    >
                        ?
                    </span>
                    which is{' '}
                    <span className="text-pink-600">
                        {displayRatio(pointSlope.y, pointSlope.x)}
                    </span>{' '}
                    for slope
                </p>
                <p>
                    The line crosses the y axis at{' '}
                    <span className="text-blue-600"> {pointIntercept.y}</span>
                </p>
                <p>
                    The line equation is then: y = x *{' '}
                    <span className="text-pink-600">
                        {displayRatio(pointSlope.y, pointSlope.x)}
                    </span>{' '}
                    + <span className="text-blue-600">{pointIntercept.y}</span>
                </p>
            </div>
            <Mafs>
                <Coordinates.Cartesian />
                <Transform translate={pointIntercept.point}>
                    <Line.ThroughPoints
                        point1={pointSlope.point}
                        point2={[0, 0]}
                    />
                    <Vector tip={pointSlope.point} />
                    {isSlopeHelpVisible ? (
                        <>
                            <Vector
                                tip={[0, pointSlope.y]}
                                color={Theme.green}
                            />{' '}
                            <Vector
                                tail={[0, pointSlope.y]}
                                tip={pointSlope.point}
                                color={Theme.yellow}
                            />{' '}
                        </>
                    ) : null}
                    {pointSlope.element}
                </Transform>

                {pointIntercept.element}
            </Mafs>
        </div>
    );
}
