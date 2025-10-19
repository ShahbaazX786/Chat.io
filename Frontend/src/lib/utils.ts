export function formatMsgTime(date: string) {
  let result = null;
  if (date) {
    result = new Date(date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  }
  return result;
}

const getMemberSince = (date: string): string => {
  const createdAt = new Date(date);
  const today = new Date();

  let years = today.getFullYear() - createdAt.getFullYear();
  let months = today.getMonth() - createdAt.getMonth();
  let days = today.getDate() - createdAt.getDate();

  // Adjusting if days gets negative.
  if (days < 0) {
    months -= 1;
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const parts = [];
  if (years > 0) parts.push(`${years} Year${years > 1 ? "s" : ""}`);
  if (months > 0) parts.push(`${months} Month${months > 1 ? "s" : ""}`);
  if (days > 0 || parts.length === 0)
    parts.push(`${days} Day${days > 1 ? "s" : ""}`);

  if (parts.length === 1) return parts[0];
  if (parts.length === 2) return `${parts[0]} and ${parts[1]}`;
  return `${parts[0]}, ${parts[1]}, and ${parts[2]}`;
};

const getMemberStatus = () => {
  const status = ["Pro", "Free", "Plus"];
  return status[Math.floor(Math.random() * status.length)];
};

export { getMemberSince, getMemberStatus };
