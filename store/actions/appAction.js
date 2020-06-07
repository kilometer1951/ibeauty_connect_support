import {URL} from '../../socketURL';

export const getSupportConversations = async supportMessageId => {
  const response = await fetch(
    `${URL}/api/get_supportConvo/${supportMessageId}`,
  );
  const resData = await response.json();
  return resData;
};

export const sendSMSReminder = async (phone, userName, typeOfUser) => {
  const response = await fetch(
    `${URL}/supportApi/send_support_sms_notification`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone,
        userName,
        typeOfUser,
      }),
    },
  );
  const resData = await response.json();
  return resData;
};

export const closeSupportTicket = async supportMessageId => {
  const response = await fetch(`${URL}/supportApi/close_support_ticket`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      supportMessageId,
    }),
  });
  const resData = await response.json();
  return resData;
};

export const newSupportMessage = async messageData => {
  const response = await fetch(`${URL}/api/new_support_message_partner`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messageData,
    }),
  });
  const resData = await response.json();
  return resData;
};

export const newSupportMessage_client = async messageData => {
  const response = await fetch(`${URL}/api/new_support_message`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messageData,
    }),
  });
  const resData = await response.json();
  return resData;
};

export const activateUser = async userId => {
  const response = await fetch(
    `${URL}/supportApi/accounHasBeenApproved/partnerAccount/${userId}/staffHandler/wilson`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  const resData = await response.json();
  return resData;
};

export const getClients = async () => {
  const response = await fetch(`${URL}/supportApi/get_clients`);
  const resData = await response.json();
  return resData;
};

export const getPartners = async () => {
  const response = await fetch(`${URL}/supportApi/get_partners`);
  const resData = await response.json();
  return resData;
};

export const getPartnersNeedingActivation = async () => {
  const response = await fetch(
    `${URL}/supportApi/get_partners_needing_activation`,
  );
  const resData = await response.json();
  return resData;
};

export const getNumberOfSupportTickets = async () => {
  const response = await fetch(`${URL}/supportApi/getSupport_tickets`);
  const resData = await response.json();
  return resData;
};

export const getSupport = async () => {
  const response = await fetch(`${URL}/supportApi/getSupport_tickets`);
  const resData = await response.json();
  return resData;
};

export const getAllAppointments = async partnerId => {
  const response = await fetch(
    `${URL}/supportApi/get_appointment_per_partner/${partnerId}`,
  );
  const resData = await response.json();
  return resData;
};

export const updateCartCheckIn = async checkInData => {
  const response = await fetch(`${URL}/api/update_cart_check_in`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      checkInData,
    }),
  });
  const resData = await response.json();
};

export const searchPartner = async search => {
  const response = await fetch(`${URL}/supportApi/search_partner/${search}`);
  const resData = await response.json();
  return resData;
};

export const confirmNoShow = async noShowAppoitmentData => {
  const response = await fetch(`${URL}/api/confirm_no_show`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      noShowAppoitmentData,
    }),
  });
  const resData = await response.json();
};

export const updateSSN = async (partnerId, ssnInput) => {
  const response = await fetch(`${URL}/supportApi/update_ssn`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      partnerId,
      ssnInput,
    }),
  });
  const resData = await response.json();
};
