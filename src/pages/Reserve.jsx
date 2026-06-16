import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  TextField,
  Chip,
  Box,
  Container,
} from "@mui/material";
import { CalendarMonth, AccessTime, Person } from "@mui/icons-material";
import { useSelector } from "react-redux";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

const Reserve = () => {
  const [name, setName] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const themeMode = useSelector((state) => state.theme.mode);

  const availableTimes = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
  ];

  const handleReserve = () => {
    if (!name || !selectedDate || !selectedTime) {
      alert("لطفا اطلاعات را کامل کنید");
      return;
    }

    const persianDate = selectedDate?.format ? selectedDate.format("YYYY/MM/DD") : selectedDate;
    alert(
      `نوبت شما برای ${name} در تاریخ ${persianDate} ساعت ${selectedTime} ثبت شد`
    );

    // Reset form
    setName("");
    setSelectedDate(null);
    setSelectedTime("");
  };

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 80px)",
        background:
          themeMode === "dark"
            ? "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)"
            : "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
        py: 6,
      }}
    >
      <Container maxWidth="md">
        <Card
          elevation={8}
          sx={{
            borderRadius: 4,
            overflow: "hidden",
            background:
              themeMode === "dark"
                ? "linear-gradient(135deg, #1e293b 0%, #334155 100%)"
                : "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
            border: `1px solid ${themeMode === "dark" ? "#334155" : "#e2e8f0"}`,
          }}
        >
          {/* Header */}
          <Box
            sx={{
              background: "linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)",
              p: 4,
              color: "white",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 3, flexWrap: "wrap" }}>
              <Avatar
                sx={{
                  width: 90,
                  height: 90,
                  bgcolor: "#fff",
                  color: "#3b82f6",
                  fontSize: "32px",
                  fontWeight: "bold",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                }}
              >
                د
              </Avatar>

              <Box>
                <Typography variant="h4" fontWeight="bold" sx={{ mb: 1 }}>
                  دکتر امامی
                </Typography>

                <Typography variant="body1" sx={{ opacity: 0.95 }}>
                  متخصص داخلی و مشاوره پزشکی
                </Typography>

                <Box sx={{ display: "flex", gap: 1, mt: 2, flexWrap: "wrap" }}>
                  <Chip
                    label="سابقه 15 سال"
                    size="small"
                    sx={{
                      bgcolor: "rgba(255,255,255,0.2)",
                      color: "white",
                      fontWeight: 600,
                    }}
                  />
                  <Chip
                    label="رتبه 1 کشوری"
                    size="small"
                    sx={{
                      bgcolor: "rgba(255,255,255,0.2)",
                      color: "white",
                      fontWeight: 600,
                    }}
                  />
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Form */}
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {/* Name Input */}
              <Box>
                <Typography
                  variant="subtitle1"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mb: 2,
                    fontWeight: 600,
                    color: themeMode === "dark" ? "#e2e8f0" : "#1e293b",
                  }}
                >
                  <Person sx={{ color: "#3b82f6" }} />
                  نام و نام خانوادگی
                </Typography>
                <TextField
                  fullWidth
                  placeholder="نام و نام خانوادگی خود را وارد کنید"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      bgcolor:
                        themeMode === "dark"
                          ? "rgba(15, 23, 42, 0.5)"
                          : "rgba(255, 255, 255, 0.8)",
                      "& fieldset": {
                        borderColor:
                          themeMode === "dark" ? "#475569" : "#cbd5e1",
                      },
                      "&:hover fieldset": {
                        borderColor: "#3b82f6",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#3b82f6",
                      },
                    },
                    "& .MuiInputBase-input": {
                      color: themeMode === "dark" ? "#e2e8f0" : "#1e293b",
                    },
                  }}
                />
              </Box>

              {/* Persian Date Picker */}
              <Box>
                <Typography
                  variant="subtitle1"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mb: 2,
                    fontWeight: 600,
                    color: themeMode === "dark" ? "#e2e8f0" : "#1e293b",
                  }}
                >
                  <CalendarMonth sx={{ color: "#3b82f6" }} />
                  انتخاب تاریخ (تقویم شمسی)
                </Typography>
                <DatePicker
                  value={selectedDate}
                  onChange={setSelectedDate}
                  calendar={persian}
                  locale={persian_fa}
                  format="YYYY/MM/DD"
                  placeholder="تاریخ را انتخاب کنید"
                  calendarPosition="bottom-center"
                  containerStyle={{
                    width: "100%",
                  }}
                  style={{
                    width: "100%",
                    height: "56px",
                    borderRadius: "8px",
                    border: `1px solid ${themeMode === "dark" ? "#475569" : "#cbd5e1"}`,
                    backgroundColor:
                      themeMode === "dark"
                        ? "rgba(15, 23, 42, 0.5)"
                        : "rgba(255, 255, 255, 0.8)",
                    padding: "0 16px",
                    fontSize: "16px",
                    color: themeMode === "dark" ? "#e2e8f0" : "#1e293b",
                    outline: "none",
                    fontFamily: "IRANSansfa",
                  }}
                />
              </Box>

              {/* Time Selection */}
              <Box>
                <Typography
                  variant="subtitle1"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mb: 2,
                    fontWeight: 600,
                    color: themeMode === "dark" ? "#e2e8f0" : "#1e293b",
                  }}
                >
                  <AccessTime sx={{ color: "#3b82f6" }} />
                  انتخاب ساعت
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 1.5,
                    p: 2.5,
                    borderRadius: 2,
                    bgcolor:
                      themeMode === "dark"
                        ? "rgba(15, 23, 42, 0.5)"
                        : "rgba(239, 246, 255, 0.5)",
                    border: `1px solid ${themeMode === "dark" ? "#334155" : "#e2e8f0"}`,
                  }}
                >
                  {availableTimes.map((time) => (
                    <Chip
                      key={time}
                      label={time}
                      onClick={() => setSelectedTime(time)}
                      sx={{
                        bgcolor:
                          selectedTime === time
                            ? "#3b82f6"
                            : themeMode === "dark"
                              ? "#1e293b"
                              : "#ffffff",
                        color:
                          selectedTime === time
                            ? "#ffffff"
                            : themeMode === "dark"
                              ? "#e2e8f0"
                              : "#1e293b",
                        border: `2px solid ${selectedTime === time ? "#3b82f6" : themeMode === "dark" ? "#475569" : "#cbd5e1"}`,
                        fontWeight: 600,
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        fontSize: "0.9rem",
                        minWidth: "70px",
                        "&:hover": {
                          bgcolor:
                            selectedTime === time ? "#2563eb" : "#3b82f6",
                          color: "#ffffff",
                          transform: "scale(1.05)",
                          borderColor: "#3b82f6",
                        },
                      }}
                    />
                  ))}
                </Box>
              </Box>

              {/* Working Hours Info */}
              <Box
                sx={{
                  p: 3,
                  borderRadius: 2,
                  bgcolor:
                    themeMode === "dark"
                      ? "rgba(59, 130, 246, 0.1)"
                      : "rgba(59, 130, 246, 0.05)",
                  border: `1px solid ${themeMode === "dark" ? "rgba(59, 130, 246, 0.3)" : "rgba(59, 130, 246, 0.2)"}`,
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 700,
                    mb: 1.5,
                    color: themeMode === "dark" ? "#e2e8f0" : "#1e293b",
                  }}
                >
                  ساعات کاری:
                </Typography>
                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                  <Chip
                    label="صبح: 09:00 - 12:00"
                    sx={{
                      bgcolor: "#3b82f6",
                      color: "white",
                      fontWeight: 600,
                    }}
                  />
                  <Chip
                    label="عصر: 16:00 - 21:00"
                    sx={{
                      bgcolor: "#6366f1",
                      color: "white",
                      fontWeight: 600,
                    }}
                  />
                </Box>
              </Box>

              {/* Submit Button */}
              <Button
                variant="contained"
                size="large"
                onClick={handleReserve}
                disabled={!name || !selectedDate || !selectedTime}
                sx={{
                  borderRadius: 3,
                  py: 2,
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  background:
                    "linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)",
                  boxShadow: "0 4px 12px rgba(59, 130, 246, 0.4)",
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)",
                    transform: "translateY(-2px)",
                    boxShadow: "0 6px 20px rgba(59, 130, 246, 0.5)",
                  },
                  "&:disabled": {
                    background: themeMode === "dark" ? "#334155" : "#cbd5e1",
                    color: themeMode === "dark" ? "#64748b" : "#94a3b8",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                ثبت نوبت
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default Reserve;
