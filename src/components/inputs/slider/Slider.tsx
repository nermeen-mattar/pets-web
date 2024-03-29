import { ChangeEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { theme } from '../../../theme';
import { Range } from '../../../types/range';

interface Props {
    onChange: (range: Range) => void;
    min: number;
    max: number;
}

const SliderContainer = styled.section`
    padding: ${theme.spacing.medium};
`;

const RangeSlider = styled.input`
    width: 100%;
`;

const SelectedRange = styled.section`
    text-align: center;
`;

function AgeRangeInput({ min, max, onChange }: Props) {
    const [range, setRange] = useState<Range>({ min, max });
    const { t } = useTranslation();

    useEffect(() => {
        onChange(range);
    }, [range, onChange]);

    const handleAgeChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value);
        const isMin = event.target.name === 'min';
        if (isMin && value > range.max) {
            return;
        } else if (!isMin && value < range.min) {
            return;
        }
        setRange((prev: Range) => ({
            min: isMin ? value : prev.min,
            max: isMin ? prev.max : value,
        }));
    };

    return (
        <SliderContainer>
            <label htmlFor="min-range">{t('filters.min')}</label>
            <RangeSlider
                id="min-range"
                name="min"
                type="range"
                min={min}
                max={max}
                value={range.min}
                onChange={handleAgeChange}
                aria-label={t('filters.aria-min')}
            />
            <label htmlFor="max-range">{t('filters.max')}</label>
            <RangeSlider
                id="max-range"
                name="max"
                type="range"
                min={min}
                max={max}
                value={range.max}
                onChange={handleAgeChange}
                aria-label={t('filters.aria-max')}
            />
            <SelectedRange aria-live="polite">
                {t('filters.selected-range')}: {range.min} - {range.max}
            </SelectedRange>
        </SliderContainer>
    );
}

export default AgeRangeInput;
