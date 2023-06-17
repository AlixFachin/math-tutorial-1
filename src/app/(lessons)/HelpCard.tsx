import { useState } from 'react';

export type HelpCardProps = {
    title: string;
    description: React.ReactNode;
};
/**
 * HelpCard Component: header with collapsible content
 * @param
 * @returns
 */
const HelpCard: React.FunctionComponent<HelpCardProps> = ({
    title,
    description,
}) => {
    const [isHelpDisplayed, setHelpDisplayed] = useState(true);

    const toggleDisplayed = () => {
        setHelpDisplayed((previousValue: boolean) => !previousValue);
    };

    return (
        <div className="flex flex-col p-4 shadow-lg">
            <div
                className="mb-2 flex items-center justify-start border-b-2 border-b-gray-400 "
                onClick={toggleDisplayed}
            >
                <h2 className="text-lg">{title}</h2>
                <div className="flex-grow"></div>
                <div>{isHelpDisplayed ? 'v' : '<'}</div>
            </div>
            {isHelpDisplayed ? description : null}
        </div>
    );
};

export default HelpCard;
