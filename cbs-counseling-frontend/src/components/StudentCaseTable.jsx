import React, { useEffect, useState } from "react";
import { useListStore } from "../store/listStore";

import { ReactComponent as FilterIcon } from "../assets/icons/FilterIcon.svg";
import { useNavigate } from "react-router-dom";
import { Box, Stack, Tab, Tabs, Typography } from "@mui/material";
import StyledSearchbar from "../ui/StyledSearchbar";
import StyledTable from "../ui/StyledTable";
const StudentCaseTable = ({ refreshTrigger, setLastSynced }) => {
  const navigate = useNavigate();
  const { userSession } = useListStore();
  const [pageNo, setPageNo] = useState(1);
  const [row, setRow] = useState(10);
  const [selectedTab, setSelectedTab] = useState(0);
  const [status, setStatus] = useState("pending");
  const [search, setSearch] = useState("");
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
    switch (newValue) {
      case 0:
        setStatus("pending");
        break;
      case 1:
        setStatus("completed");
        break;
      case 2:
        setStatus("cancelled");
        break;
      case 3:
        setStatus("referred");
        break;
      case 4:
        setStatus(null);
        break;
      default:
        setStatus(null);
        break;
    }
  };
  const handleView = (id) => {
    // console.log("View item:", id);
    navigate(`/student/session/case/${id}`);
  };
  const userColumns = [
    { title: "Case ID", field: "case_id" },
    { title: "Counselor Name", field: "counsellor_name" },
    { title: "Type of Counseling", field: "session_type" },
    { title: "Created on", field: "createdAt" },
    { title: "Status", field: "status" },
  ];
  useEffect(() => {
    let filter = { type: "cases" };
    if (search) {
      filter.searchQuery = search;
      setPageNo(1);
    }
    if (status) {
      filter.status = status;
    }
    filter.page = pageNo;
    filter.limit = row;
    userSession(filter);
    const currentTime = new Date();
    setLastSynced(
      `${currentTime?.getHours()}:${String(currentTime?.getMinutes())?.padStart(
        2,
        "0"
      )} ${currentTime?.getHours() >= 12 ? "PM" : "AM"}`
    );
  }, [userSession, refreshTrigger, setLastSynced, search, pageNo, status, row]);
  return (
    <>
      <Stack
        direction={"row"}
        justifyContent={"end"}
        paddingBottom={3}
        alignItems={"center"}
      >
        {" "}
        <Stack direction={"row"} spacing={2}>
          <StyledSearchbar
            placeholder={"Search Counselor Name"}
            onchange={(e) => setSearch(e.target.value)}
          />
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
        marginBottom={4}
        bgcolor={"white"}
        borderRadius={"15px"}
        boxShadow={"0px 4px 20px rgba(0, 0, 0, 0.1)"}
      >
        {" "}
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          aria-label="session-tabs"
          TabIndicatorProps={{
            style: {
              backgroundColor: "#864DF4",
              height: 4,
              borderRadius: "4px",
            },
          }}
          sx={{
            bgcolor: "white",
            paddingTop: "34px",
            borderBottom: "1px solid #E0E0E0",
            "& .MuiTabs-indicator": {
              backgroundColor: "#864DF4",
            },
            "& .MuiTab-root": {
              textTransform: "none",
              fontWeight: 600,
              fontSize: "16px",
              color: "#828282",
            },
            "& .Mui-selected": {
              color: "#864DF4",
            },
          }}
        >
          <Tab label="Upcoming" />
          <Tab label="Closed" />
          <Tab label="Cancelled" />
          <Tab label="Referred" />
          <Tab label="All Cases" />
        </Tabs>
        <StyledTable
          columns={userColumns}
          onView={handleView}
          pageNo={pageNo}
          setPageNo={setPageNo}
          rowPerSize={row}
          setRowPerSize={setRow}
        />{" "}
      </Box>
    </>
  );
};

export default StudentCaseTable;
