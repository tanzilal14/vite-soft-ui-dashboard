import gql from "graphql-tag";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    loginByEmail(input: { email: $email, password: $password }) {
      ... on AuthUserResponse {
        token
        user {
          id
          email
          role {
            name
          }
        }
      }

      ... on Error {
        message
      }
    }
  }
`;

export const ME = gql`
  query me($id: ID!) {
    user(id: $id) {
      id
      email
      role
      isActive
    }
  }
`;

export const TRAINERS = gql`
  query trainers(
    $filter: TrainerFilter
    $paging: OffsetPaging!
    $sorting: [TrainerSort!]!
  ) {
    trainers(filter: $filter, paging: $paging, sorting: $sorting) {
      nodes {
        id
        name
        price
        image
        trainer_image_url
        createdAt
        updatedAt
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      totalCount
    }
  }
`;

export const TRAINER_CREATE = gql`
  mutation trainercreate($input: CreateOneTrainerInput!) {
    trainerCreate(input: $input) {
      id
      trainer_image_url
      image
      name
      price
    }
  }
`;
export const TRAINER_UPDATE = gql`
  mutation trainerupdate($input: UpdateOneTrainerInput!) {
    trainerUpdate(input: $input) {
      id
      trainer_image_url
      image
      name
      price
    }
  }
`;
export const TRAINER_DELETE = gql`
  mutation trainerdelete($id: ID!) {
    trainerDelete(input: { id: $id }) {
      id
      trainer_image_url
      image
      name
      price
    }
  }
`;

export const PLACES = gql`
  query places(
    $filter: PlaceFilter
    $paging: OffsetPaging!
    $sorting: [PlaceSort!]!
  ) {
    places(filter: $filter, paging: $paging, sorting: $sorting) {
      nodes {
        id
        name
        address
        description
        distance
        image_url
        images
        latitude
        longitude
        region {
          id
          name
          type
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      totalCount
    }
  }
`;

export const PLACE_CREATE = gql`
  mutation placecreate($input: CreateOnePlaceInput!) {
    createOnePlace(input: $input) {
      id
      name
      address
      description
      distance
      image_url
      images
      latitude
      longitude
      distance
    }
  }
`;
export const PLACE_UPDATE = gql`
  mutation placeupdate($input: UpdateOnePlaceInput!) {
    updateOnePlace(input: $input) {
      id
      name
      address
      description
      distance
      image_url
      images
      latitude
      longitude
      distance
    }
  }
`;
export const PLACE_DELETE = gql`
  mutation placedelete($id: ID!) {
    deleteOnePlace(input: { id: $id }) {
      id
      name
      address
      description
      distance
      image_url
      images
      latitude
      longitude
      distance
    }
  }
`;

export const REGIONS = gql`
  query regions(
    $filter: regionFilter
    $paging: OffsetPaging!
    $sorting: [regionSort!]!
  ) {
    regions(filter: $filter, paging: $paging, sorting: $sorting) {
      nodes {
        id
        name
        type
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;

export const PRODUCTS = gql`
  query products(
    $filter: productFilter
    $paging: OffsetPaging!
    $sorting: [productSort!]!
  ) {
    products(filter: $filter, paging: $paging, sorting: $sorting) {
      nodes {
        id
        name
        description
        price
        place {
          id
          name
          description
          address
        }
        schedules {
          id
          startTime
          endTime
          dayname
          timePerSession
        }
        createdAt
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      totalCount
    }
  }
`;

export const PRODUCT_CREATE = gql`
  mutation productcreate($input: CreateOneProductInput!) {
    createOneProduct(input: $input) {
      id
      name
      description
      price
    }
  }
`;
export const PRODUCT_UPDATE = gql`
  mutation productupdate($input: UpdateOneProductInput!) {
    updateOneProduct(input: $input) {
      id
      name
      description
      price
    }
  }
`;
export const PRODUCT_DELETE = gql`
  mutation productdelete($id: ID!) {
    deleteOneProduct(input: { id: $id }) {
      id
      name
      description
      price
    }
  }
`;
export const SCHEDULE_MANY_CREATE = gql`
  mutation schedulemanycreate($input: [CreateSchedule!]!) {
    createManySchedules(input: { schedules: $input }) {
      id
      dayname
      createdAt
      endTime
      startTime
    }
  }
`;
export const SCHEDULE_UPDATE = gql`
  mutation scheduleupdate($input: UpdateOneScheduleInput!) {
    updateOneSchedule(input: $input) {
      id
      dayname
      startTime
      endTime
    }
  }
`;
export const SCHEDULE_MANY_DELETE = gql`
  mutation schedulemanydelete($filter: scheduleDeleteFilter!) {
    deleteManySchedules(input: { filter: $filter }) {
      deletedCount
    }
  }
`;

export const TRANSACTIONS = gql`
  query transactions(
    $filter: transactionFilter
    $paging: OffsetPaging!
    $sorting: [transactionSort!]!
  ) {
    transactions(filter: $filter, paging: $paging, sorting: $sorting) {
      nodes {
        id
        payment {
          id
          status
          paidAt
          totalAmount
          virtualAccount
        }
        payment_method
        phone_number
        product {
          id
          name
          price
        }
        status
        transaction_details {
          product_id
          scheduled_date
          scheduled_time
        }
        transaction_profiles {
          profile_id
          profile_name
        }
        type
        amount
        user {
          id
          email
          role
        }
        createdAt
        updatedAt
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;

export const UPLOAD_IMAGE = gql`
  mutation uploadimages($file: ImageFile!, $input: UploadPhotoInput!) {
    uploadImages(file: $file, input: $input) {
      ... on FilenameResponse {
        filename
      }

      ... on Error {
        message
      }
    }
  }
`;

export const USERS = gql`
  query users(
    $filter: UserFilter
    $paging: OffsetPaging!
    $sorting: [UserSort!]!
  ) {
    users(filter: $filter, paging: $paging, sorting: $sorting) {
      nodes {
        id
        email
        profiles {
          id
          gender
          identityNumber
          fullname
          email
          address
          phone
        }
        tncs {
          id
          content
          version
        }
        role
        isActive
        createdAt
        updatedAt
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;

export const CLINICIAN = gql`
  query clinicians(
    $filter: clinicianFilter
    $paging: OffsetPaging!
    $sorting: [clinicianSort!]!
  ) {
    clinicians(filter: $filter, paging: $paging, sorting: $sorting) {
      nodes {
        email
        fax
        id
        name
        phone
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      totalCount
    }
  }
`;

export const CLINICIAN_CREATE = gql`
  mutation clinicianCreate($input: CreateOneClinicianInput!) {
    clinicianCreate(input: $input) {
      email
      fax
      id
      name
      phone
    }
  }
`;

export const CLINICIAN_UPDATE = gql`
  mutation clinicianUpdate($input: UpdateOneClinicianInput!) {
    clinicianUpdate(input: $input) {
      email
      fax
      id
      name
      phone
    }
  }
`;

export const CLINICIAN_DELETE = gql`
  mutation clinicianDelete($input: DeleteOneClinicianInput!) {
    clinicianDelete(input: $input) {
      email
      fax
      id
      name
      phone
    }
  }
`;

export const CUSTOMER = gql`
  query customers(
    $filter: customerFilter
    $paging: OffsetPaging!
    $sorting: [customerSort!]!
  ) {
    customers(filter: $filter, paging: $paging, sorting: $sorting) {
      nodes {
        address
        customer_name
        id
        lab_email
        lab_phone
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      totalCount
    }
  }
`;

export const PATIENT = gql`
  query patients(
    $filter: patientFilter
    $paging: OffsetPaging!
    $sorting: [patientSort!]!
  ) {
    patients(filter: $filter, paging: $paging, sorting: $sorting) {
      nodes {
        address
        birthdate
        createdAt
        kalgen_id
        email
        gender
        id
        identityNumber
        identityType
        is_active
        medicalRecordNumber
        name
        phone
        rt
        rw
        subdistrict {
          id
          name
          district {
            id
            name
            city {
              id
              name
              province {
                id
                name
              }
            }
          }
        }
        updatedAt
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      totalCount
    }
  }
`;

export const PATIENT_UPDATE = gql`
  mutation patientUpdate($input: UpdateOnePatientInput!) {
    patientUpdate(input: $input) {
      address
      birthdate
      kalgen_id
      createdAt
      email
      gender
      id
      kalgen_id
      identityNumber
      identityType
      is_active
      medicalRecordNumber
      name
      phone
      rt
      rw
      subdistrict {
        district {
          id
          name
          city {
            id
            name
            province {
              id
              name
            }
          }
        }
        id
        name
      }
      updatedAt
    }
  }
`;

export const PROVINCE = gql`
  query provinces(
    $filter: provinceFilter
    $paging: OffsetPaging!
    $sorting: [provinceSort!]!
  ) {
    provinces(filter: $filter, paging: $paging, sorting: $sorting) {
      nodes {
        id
        name
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      totalCount
    }
  }
`;
export const CITY = gql`
  query citys(
    $filter: cityFilter
    $paging: OffsetPaging!
    $sorting: [citySort!]!
  ) {
    citys(filter: $filter, paging: $paging, sorting: $sorting) {
      nodes {
        id
        name
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      totalCount
    }
  }
`;

export const DISTRICT = gql`
  query districts(
    $filter: districtFilter
    $paging: OffsetPaging!
    $sorting: [districtSort!]!
  ) {
    districts(filter: $filter, paging: $paging, sorting: $sorting) {
      nodes {
        id
        name
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      totalCount
    }
  }
`;

export const SUBDISTRICT = gql`
  query subdistricts(
    $filter: subdistrictFilter
    $paging: OffsetPaging!
    $sorting: [subdistrictSort!]!
  ) {
    subdistricts(filter: $filter, paging: $paging, sorting: $sorting) {
      nodes {
        id
        name
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      totalCount
    }
  }
`;
export const PRODUCT_LIST = gql`
  query feederForms(
    $filter: feederFilter
    $paging: OffsetPaging!
    $sorting: [feederSort!]!
  ) {
    feederForms(
      # filter: { id: { eq: "6f12172a-7b91-4549-9e83-24f595ca667b" } }
      # paging: { limit: 10 }
      # sorting: []
      filter: $filter
      paging: $paging
      sorting: $sorting
    ) {
      nodes {
        createdAt
        getProducts(
          filter: { is_active: { is: true }, product_id: { is: null } }
          sorting: [{ direction: ASC, field: order_number }]
        ) {
          id
          product_id
          name
          price
          qtyable
          selectable
          unit
          children(
            filter: { is_active: { is: true } }
            sorting: [{ direction: ASC, field: order_number }]
          ) {
            id
            product_id
            name
            price
            qtyable
            selectable
            unit
            children(
              filter: { is_active: { is: true } }
              sorting: [{ direction: ASC, field: order_number }]
            ) {
              id
              product_id

              name
              price
              qtyable
              selectable
              unit
            }
          }
        }
        id
        is_active
        name
        updatedAt
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      totalCount
    }
  }
`;

export const FEEDER_TRANSACTION_HISTOLOGI_CREATE = gql`
  mutation feederTransactionCreate($input: feederTransactionCreate!) {
    feederTransactionCreate(input: $input) {
      __typename
      ... on InvalidInputError {
        errors {
          field
          messages
        }
        message
      }
      ... on SuccessFeederTransaction {
        id
      }

      ... on Error {
        message
      }
    }
  }
`;
export const FEEDER_TRANSACTION_CREATE = gql`
  mutation feederTransactionCreate($input: CreateOneHistologyInput!) {
    feederHistologyCreate(input: $input) {
      id

      transaction_id

      rf_notes
      rf_contraception
      rf_result_reporting_method
      rf_result_reporting_email

      si_tissue_location
      si_collection_method
      si_operation_time
      si_time_tissue_take_out
      si_time_start_fixation
      si_fixation_reagent
      si_fixation_reagent_other

      as_clinical_diagnosis
      as_main_symptom_n_desc_of_the_disease
      as_prev_cytology_or_histopathology_testing_result

      tnc
      other_order_or_comment
    }
  }
`;

export const FEEDER_TRANSACTION = gql`
  query feederTransactions(
    $filter: transactionFilter
    $paging: OffsetPaging!
    $sorting: [transactionSort!]!
  ) {
    feederTransactions(
      # filter: { id: { eq: "6f12172a-7b91-4549-9e83-24f595ca667b" } }
      # paging: { limit: 10 }
      # sorting: []
      filter: $filter
      paging: $paging
      sorting: $sorting
    ) {
      nodes {
        id
        customer {
          id
          address
          customer_name
          lab_email
          lab_phone
        }
        customer_id
        feeder_id
        getClinicians(filter: {}, sorting: []) {
          id
          name
          email
          phone
          fax
        }
        getProducts(filter: {}, sorting: []) {
          id
          name
        }
        histology {
          as_clinical_diagnosis
          as_main_symptom_n_desc_of_the_disease
          as_prev_cytology_or_histopathology_testing_result
          id
          other_order_or_comment
          rf_contraception
          rf_notes
          rf_result_reporting_email
          rf_result_reporting_method
          si_collection_method
          si_fixation_reagent
          si_fixation_reagent_other
          si_operation_time
          si_time_start_fixation
          si_time_tissue_take_out
          si_tissue_location
          tnc
        }

        id
        iuo_courier
        iuo_innolab_id
        iuo_order_type
        iuo_patient_type
        iuo_patient_type_others
        iuo_receiver
        iuo_sample_receiving_condition
        iuo_sample_receiving_condition_details

        lab {
          name
          id
        }
        lab_id
        patient {
          address
          birthdate
          createdAt
          email
          gender
          id
          kalgen_id
          identityNumber
          identityType
          is_active
          medicalRecordNumber
          name
          phone
          rt
          rw
          subdistrict {
            id
            name
            district {
              id

              name
              city {
                id

                name
                province {
                  id

                  name
                }
              }
            }
          }
        }
        patient_id
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      totalCount
    }
  }
`;

export const FEEDER_TRANSACTION_DELETE = gql`
  mutation feederTransactionDelete($id: ID!) {
    feederTransactionDelete(input: { id: $id }) {
      id
    }
  }
`;

export const GET_LAST_OF_KALGEN_ID = gql`
  mutation patientGetLastOfKalgenId {
    patientGetLastOfKalgenId {
      kalge_id
    }
  }
`;
