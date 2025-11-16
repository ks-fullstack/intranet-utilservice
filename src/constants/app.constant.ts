const AppConstants = {
  CreateResponseMessage: "Record created successfully",
  DeleteResponeMessage: " record deleted successfully",
  GetResponseMessage: " record found",
  RecordNotFoundMessage: "Record not found",
  UpdateResponeMessage: " record updated successfully",
  EmptyPayloadMessage: "Empty payload",
  InvalidQueryParameterMessage: "Invalid query parameter",
  FilterExpressionRequiredMessage: "Filter expression required",
  UpdatePayloadRequiredMessage: "Payload required to update data",
};

const AccessControlAccess = {
  AllAccess : ["superadmin", "admin"] 
}

export default AppConstants;
export { AccessControlAccess };
