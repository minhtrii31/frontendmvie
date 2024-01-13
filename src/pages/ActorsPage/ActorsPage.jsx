import React, { useEffect, useState } from "react";
import "./ActorsPage.css";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import { getAllActors } from "../../services/actor.service";
import { Container, Row } from "react-bootstrap";
import ActorsCard from "../../components/Cards/ActorCard/ActorCard";
import useLoading from "../../hooks/useLoading";
import Loading from "../../components/Loading/Loading";

function ActorsPage() {
  const isLoading = useLoading();
  const [actors, setActors] = useState([]);
  useEffect(() => {
    getAllActors()
      .then((data) => {
        setActors(data);
      })
      .catch((error) => {
        console.log("Error fetching data: ", error);
      });
  }, []);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <MainLayout>
          <Container>
            <Row>
              <ActorsCard actors={actors}></ActorsCard>
            </Row>
          </Container>
        </MainLayout>
      )}
    </>
  );
}

export default ActorsPage;
