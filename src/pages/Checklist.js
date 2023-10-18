import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Button, Card, CardBody, CardHeader, Form, Col, Container, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";
import Swal from "sweetalert2";
import { deleteChecklistApi, getChecklistApi, postChecklistApi } from "../services/checklist";

const Checklist = () => {
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [data, setData] = useState([]);
  const [name, setName] = useState("");

  const handleShowCheklistItem = (id) => {
    window.location.href = `/checklist/${id}`;
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Status",
      selector: (row) => row.checklistCompletionStatus,
    },
    {
      name: "Action",
      selector: (row) => (
        <>
          <div className="d-flex">
            <Button color="success" className="me-2" size="sm" onClick={() => handleShowCheklistItem(row.id)}>
              Detail Item
            </Button>

            <Button color="danger" className="me-2" size="sm" onClick={() => handleDelete(row.id)}>
              Delete
            </Button>
          </div>
        </>
      ),
    },
  ];

  const getData = async () => {
    setLoadingData(true);
    getChecklistApi()
      .then((res) => {
        setLoadingData(false);
        setData(res.data.data);
      })
      .catch((e) => {
        setLoadingData(false);
        console.log(e);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const handleCreateChecklist = () => {
    setModal(true);
  };

  const toggle = () => setModal(!modal);

  const onClosedModal = () => {
    setName("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = {
      name,
    };

    postChecklistApi(payload)
      .then((res) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Data created !",
          showConfirmButton: false,
          timer: 2000,
          showCloseButton: true,
        });

        setModal(false);
        getData();
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete Data?",
      text: "Are you sure want to delete this data?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteChecklistApi(id)
          .then((res) => {
            Swal.fire({
              icon: "success",
              title: "Success",
              text: "Data Deleted !",
              position: "top-end",
              timer: 2000,
              showCloseButton: true,
            });
            getData();
          })
          .catch((e) => {
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: "Something Wrong !",
              showConfirmButton: false,
              timer: 2000,
              showCloseButton: true,
            });
          });
      }
    });
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <Card className="shadow">
            <CardHeader className="bg-transparent">
              <h3 className="mb-0">Checklist Page</h3>
            </CardHeader>
            <CardBody>
              <Button className="my-2" color="primary" size="small" type="button" onClick={() => handleCreateChecklist()}>
                Create Checklist
              </Button>
              <Row>
                <Col>
                  <DataTable
                    columns={columns}
                    progressPending={loadingData}
                    data={data}
                    // pagination
                    // paginationServer
                    // // paginationTotalRows={totalRows}
                    // paginationDefaultPage={page}
                    // onChangeRowsPerPage={handlePerRowsChange}
                    // onChangePage={handlePageChange}
                  />
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Modal isOpen={modal} toggle={toggle} onClosed={onClosedModal}>
        <ModalHeader toggle={toggle}>Create Checklist</ModalHeader>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <ModalBody>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input id="name" name="name" placeholder="Input Name..." type="text" onChange={(e) => setName(e.target.value)} />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggle}>
              Close
            </Button>
            <Button color="primary" type="submit" disabled={loading}>
              Submit
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </Container>
  );
};

export default Checklist;
