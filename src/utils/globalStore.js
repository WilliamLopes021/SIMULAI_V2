let inviteLink = "/login";
let managerId = "";
let userId = "";

export function setInvitationalLink(link) {
  inviteLink = link;
}

export function getInvitationalLink() {
  return { link: inviteLink.invitationalLink, id: inviteLink.id };
}

// ==================================================================
export function setManagerId(id) {
  managerId = id;
}

export function getManagerId() {
  return managerId.toString();
}

// ==================================================================

export function setUserEmail(id) {
  userId = id;
}

export function getUserEmail() {
  return userId;
}