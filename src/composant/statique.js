import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCubes, faLayerGroup, faBook } from '@fortawesome/free-solid-svg-icons';
import { faAward } from '@fortawesome/free-solid-svg-icons/faAward';
import styled from 'styled-components';

const Statique = () => {
  const [formationCount, setFormationCount] = useState(0);
  const [freeCourseCount, setFreeCourseCount] = useState(0);
  const [distinctDomainCount, setDistinctDomainCount] = useState(0); 

  useEffect(() => {
    const fetchFormationCount = async () => {
      try {
        const response = await axios.get('http://localhost:3000/formationP/count');
        setFormationCount(response.data.total);
      } catch (error) {
        console.error('Erreur lors de la récupération du nombre de formations :', error);
      }
    };

    const fetchFreeCourseCount = async () => {
      try {
        const response = await axios.get('http://localhost:3000/coursgratuis/count');
        setFreeCourseCount(response.data.total);
      } catch (error) {
        console.error('Erreur lors de la récupération du nombre de cours gratuits :', error);
      }
    };

    const fetchDistinctDomainCount = async () => {
      try {
        const response = await axios.get('http://localhost:3000/formationP/countDistinctDomains');
        setDistinctDomainCount(response.data.totalDistinctDomains);
      } catch (error) {
        console.error('Erreur lors de la récupération du nombre de domaines distincts :', error);
      }
    };

    fetchFormationCount();
    fetchFreeCourseCount();
    fetchDistinctDomainCount();
  }, []);

  return (
    <Container>
      <Section>
        <IconWrapper>
          <FontAwesomeIcon icon={faCubes} style={{ color: 'blue' }} className="fa-3x mb-4" />
        </IconWrapper>
        <Title className="text-blue fw-bold mb-3">+ {distinctDomainCount}</Title>
        <Subtitle className="fw-normal mb-0">Domaine</Subtitle>
      </Section>
      <Separator />
      <Section>
        <IconWrapper>
          <FontAwesomeIcon icon={faLayerGroup} style={{ color: 'blue' }} className="fa-3x mb-4" />
        </IconWrapper>
        <Title className="text-blue fw-bold mb-3">+ {formationCount}</Title>
        <Subtitle className="fw-normal mb-0">Formation </Subtitle>
      </Section>
      <Separator />
      <Section>
        <IconWrapper>
          <FontAwesomeIcon icon={faBook} style={{ color: 'blue' }} className="fa-3x mb-4" />
        </IconWrapper>
        <Title className="text-blue fw-bold mb-3">+ {freeCourseCount}</Title>
        <Subtitle className="fw-normal mb-0">Courses Gratuits</Subtitle>
      </Section>
      <Separator />
      <Section>
        <IconWrapper>
          <FontAwesomeIcon icon={faAward} style={{ color: 'blue' }} className="fa-3x mb-4" />
        </IconWrapper>
        <Title className="text-blue fw-bold mb-3">+ {formationCount}</Title>
        <Subtitle className="fw-normal mb-0">Certificates</Subtitle>
      </Section>
      <Separator />
  
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background-color: #f2f2f2;
  border: 1px solid #ddd;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  padding: 15px;
`;

const Separator = styled.div`
  width: 1px;
  background-color: #ddd;
`;

const IconWrapper = styled.div`
  margin-bottom: 15px;
`;

const Title = styled.h5`
  font-size: 2rem;
  color: blue; /* Couleur bleue pour les chiffres */
`;

const Subtitle = styled.h6`
  font-size: 1rem;
`;

export default Statique;
