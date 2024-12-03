import { Box, IconButton, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import StyledTable from "../../../ui/StyledTable";
import { useNavigate, useParams } from "react-router-dom";
import StyledSearchbar from "../../../ui/StyledSearchbar";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useListStore } from "../../../store/listStore";
const CaseSession = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { fetchUserSession } = useListStore();

  const [lastSynced, setLastSynced] = useState("0 minutes ago");

  const handleView = (sid) => {
    navigate(`/student/session/report/${sid}`);
  };
  const userColumns = [
    { title: "Session No", field: "session_id", padding: "none" },
    { title: "Counselor Name", field: "counsellor_name" },
    { title: "Type of Counseling", field: "type" },
    { title: "Created on", field: "createdAt" },
    { title: "Status", field: "status" },
  ];
  const handleRefresh = () => {
    if (id) {
      fetchUserSession(id);
    }
    const currentTime = new Date();
    setLastSynced(
      `${currentTime?.getHours()}:${String(currentTime?.getMinutes())?.padStart(
        2,
        "0"
      )} ${currentTime?.getHours() >= 12 ? "PM" : "AM"}`
    );
  };
  useEffect(() => {
    handleRefresh();
  }, [id]);
  return (
    <>
      <Box
        padding={"30px"}
        paddingBottom={0}
        bgcolor={"#FFFFFF"}
        borderBottom={"1px solid #E0E0E0"}
      >
        <Typography variant="h4" color={"#4A4647"}>
          Cases / session
        </Typography>
        <Stack direction="row" alignItems="center">
          <Typography color="#828282" fontSize={"12px"}>
            Last synced: {lastSynced}
          </Typography>
          <IconButton size="12px" onClick={handleRefresh} color="primary">
            <RefreshIcon />
          </IconButton>
        </Stack>
      </Box>
      <Box padding="30px" marginBottom={4}>
        <>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            paddingBottom={3}
            alignItems={"center"}
          >
            <Typography variant="h4" color={"#4A4647"}>
              Session List
            </Typography>
            <Stack direction={"row"} spacing={2}>
              <StyledSearchbar />
              {/* <Box
                bgcolor={"#FFFFFF"}
                borderRadius={"50%"}
                width={"48px"}
                height={"48px"}
                display="flex"
                alignItems="center"
                justifyContent="center"
                border="1px solid rgba(0, 0, 0, 0.12)"
                onClick={handleOpenFilter}
                style={{ cursor: "pointer" }}
              >
                <FilterIcon />
              </Box> */}
            </Stack>
          </Stack>{" "}
          <Box
            padding="2px"
            paddingBottom={0}
            marginBottom={4}
            bgcolor={"white"}
            borderRadius={"15px"}
            boxShadow={"0px 4px 20px rgba(0, 0, 0, 0.1)"}
          >
            <StyledTable
              columns={userColumns}
              // data={userData}
              dashboard
              onView={handleView}
            />{" "}
          </Box>
        </>
      </Box>
    </>
  );
};

export default CaseSession;
