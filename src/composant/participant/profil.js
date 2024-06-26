import React, { useState, useEffect } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import UserProfileModal from './model';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
} from 'mdb-react-ui-kit';
import '../../composant/participant/model';

const UserProfile = () => {
  const { id } = useParams();
  const location = useLocation();
  const history = useHistory();
  const [participantData, setParticipantData] = useState(location.state ? location.state.participantData : null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const getAxiosInstance = () => {
      const token = localStorage.getItem('token');
      return axios.create({
        baseURL: 'http://localhost:3000',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
    };

    const fetchParticipantData = async (id) => {
      try {
        const axiosInstance = getAxiosInstance();
        const response = await axiosInstance.get(`/participant/${id}`);
        setParticipantData(response.data.participant);
      } catch (error) {
        console.error('Error fetching participant data:', error);
      }
    };

    if (!participantData && id) {
      fetchParticipantData(id);
    }
  }, [id, participantData]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenModal = async (id) => {
    if (id) {
      setIsModalOpen(true);
    } else {
      console.error('ID du participant non défini');
    }
  };

  const updateParticipantData = async (id, updatedData) => {
    try {
      const axiosInstance = getAxiosInstance();
      await axiosInstance.put(`http://localhost:3000/participant/modifier/${id}`, updatedData);
      history.push(`/participant/modifier/${id}`);
    } catch (error) {
      console.error('Error updating participant data:', error);
    }
  };

  const handleSaveChanges = async (editedUserData) => {
    try {
      await updateParticipantData(editedUserData);
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };

  const getAxiosInstance = () => {
    const token = localStorage.getItem('token');
    return axios.create({
      baseURL: 'http://localhost:3000',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
  };

  return (
    <section style={{ background: 'linear-gradient(to bottom, #1526D1 0%, #add8e6 25%, white 50%, #add8e6 75%, #1526D1 100%)' }}>

      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol>
            <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
              <MDBBreadcrumbItem active>{participantData && participantData.nom ? ` ${participantData.nom}` : ''} Profile</MDBBreadcrumbItem>
            </MDBBreadcrumb>
          </MDBCol>
        </MDBRow>

        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <div className="d-flex justify-content-center mb-2">
                  <MDBCardImage
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                    alt="avatar"
                    className="rounded-circle mb-2"
                    style={{ width: '150px' }}
                    fluid
                  />
                </div>
                <div className="d-flex justify-content-center mb-2">
                  <MDBBtn>Follow</MDBBtn>
                  <MDBBtn outline className="ms-1">Message</MDBBtn>
                </div>
              </MDBCardBody>
            </MDBCard>

            <MDBCard className="mb-4 mb-lg-0">
              <MDBCardBody className="p-0">
                <MDBListGroup flush className="rounded-3">
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBIcon fas icon="globe fa-lg text-warning" />
                    <MDBCardText>{participantData && participantData.website}</MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBIcon fab icon="github fa-lg" style={{ color: '#333333' }} />
                    <MDBCardText>{participantData && participantData.github}</MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBIcon fab icon="twitter fa-lg" style={{ color: '#55acee' }} />
                    <MDBCardText>{participantData && participantData.twitter}</MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBIcon fab icon="instagram fa-lg" style={{ color: '#ac2bac' }} />
                    <MDBCardText>{participantData && participantData.instagram}</MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBIcon fab icon="facebook fa-lg" style={{ color: '#3b5998' }} />
                    <MDBCardText>{participantData && participantData.facebook}</MDBCardText>
                  </MDBListGroupItem>
                </MDBListGroup>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Full Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{participantData && participantData.prenom && participantData.nom ? `${participantData.prenom} ${participantData.nom}` : ''}</MDBCardText>
                  </MDBCol>
                </MDBRow>

                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{participantData && participantData.emailP}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>categorie  </MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{participantData && participantData.categorie}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Mobile</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{participantData && participantData.tel}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>domaine</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{participantData && participantData.domaine}</MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
              <section style={{justifyContent:"center", display:"flex",alignItems:"center" ,marginBottom:"20px"}}>
              <MDBBtn onClick={handleOpenModal}  >Modifier vos donne </MDBBtn>


                {/* <button onClick={handleOpenModal}>Modifier Profil</button> */}
                {isModalOpen && (
                  <UserProfileModal isOpen={isModalOpen} onClose={handleCloseModal} userData={participantData} userId={participantData.id_p} updateParticipantData={updateParticipantData} />
                )}
              </section>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>



    </section>
  );
};

export default UserProfile;
