import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import CategoriesList from '../../components/categories-list/CategoriesList';
import DirectorySection from '../../components/directory-section/DirectorySection';
import Filter from '../../components/filter/Filter';
import PetList from '../../components/pets-list/PetsList';
import treats from '../../images/treats.jpeg';
import { fetchPets } from '../../state/actions/petActions';
import { useAppDispatch } from '../../state/hooks';
import { RootState } from '../../state/store';
import { Pet } from '../../types/pet';

const MainContainer = styled.main`
    margin: 0 auto;
    max-width: 1200px;
    padding: 20px;
`;

const ContentSecion = styled.section`
    display: flex;
    flex-direction: column;
    gap: 40px;
`;

function PetsPage() {
    const dispatch = useAppDispatch();
    const { t } = useTranslation();

    useEffect(() => {
        dispatch(fetchPets());
    }, [dispatch]);

    const allPets: Pet[] = useSelector((state: RootState) => state.pet.pets);
    const loading = useSelector((state: RootState) => state.pet.loading);
    const error = useSelector((state: RootState) => state.pet.error);

    const [filteredPets, setFilteredPets] = useState<Pet[]>([]);

    useEffect(() => {
        if (allPets.length > 0) {
            setFilteredPets(allPets);
        }
    }, [allPets]);

    const handleFilterChange = (filteredPets: Pet[]) => {
        setFilteredPets(filteredPets);
    };

    return (
        <MainContainer>
            <h2>{t('pets')}</h2>
            <ContentSecion>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>Error: {error}</p>
                ) : (
                    <>
                        <Filter
                            items={allPets}
                            onFilterChange={handleFilterChange}
                        />
                        <PetList pets={filteredPets} />
                    </>
                )}
                <DirectorySection
                    title={t('pets-directory')}
                    description={t('see-pets-for-adoption')}
                    actionLabel={t('actions.see-all')}
                    photo={treats}
                    onClick={() => {
                        alert('hi');
                    }}
                />
                <CategoriesList />
            </ContentSecion>
        </MainContainer>
    );
}

export default PetsPage;
