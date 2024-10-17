

// pri_group = models.CharField(max_length=100, name="pri_grp")
// ad_groups = models.CharField(max_length=100, name="ad_grps")
// role = models.CharField(max_length=100, name="role")
// remote = models.BooleanField(default=False)
// dashboard = models.CharField(max_length=25, name="dashboard")
// favorites = models.CharField(max_length=100)

export const userColumns = [
    {
      field: 'email',
      headerName: 'E-mail',
      width: 150,
      editable: false,
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 100,
      editable: true,
    },
    {
      field: 'is_staff',
      headerName: 'Staff?',
      type: 'boolean',
      width: 20,
      editable: true,
    },
    {
      field: 'is_admin',
      headerName: 'Admin?',
      type: 'boolean',
      sortable: true,
      width: 20,
    },
    {
      field: 'is_active',
      headerName: 'Enabled?',
      type: 'boolean',
      sortable: true,
      width: 20,
    },
    {
      field: 'is_tenant_admin',
      headerName: 'Tenant Admin?',
      type: 'boolean',
      sortable: true,
      width: 20,
    },
    {
      field: 'tenant',
      headerName: 'Tenant',
      sortable: true,
      width: 50,
    },
    {
      field: 'phone',
      headerName: 'Phone',
      type: 'boolean',
      sortable: true,
      width: 50,
    },
    {
      field: 'location',
      headerName: 'Location',
      sortable: true,
      width: 200,
    },
  ];

  export const groupColumns = [
    {
      field: 'email',
      headerName: 'E-mail',
      width: 150,
      editable: false,
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 100,
      editable: true,
    },
    {
      field: 'is_staff',
      headerName: 'Staff?',
      type: 'boolean',
      width: 20,
      editable: true,
    },
    {
      field: 'is_admin',
      headerName: 'Admin?',
      type: 'boolean',
      sortable: true,
      width: 20,
    },
    {
      field: 'is_active',
      headerName: 'Enabled?',
      type: 'boolean',
      sortable: true,
      width: 20,
    },
    {
      field: 'is_tenant_admin',
      headerName: 'Tenant Admin?',
      type: 'boolean',
      sortable: true,
      width: 20,
    },
    {
      field: 'tenant',
      headerName: 'Tenant',
      sortable: true,
      width: 50,
    },
    {
      field: 'phone',
      headerName: 'Phone',
      type: 'boolean',
      sortable: true,
      width: 50,
    },
    {
      field: 'location',
      headerName: 'Location',
      sortable: true,
      width: 200,
    },
  ];

  export const tenantColumns = [
    {
      field: 'name',
      headerName: 'Tenant Name',
      width: 200,
      editable: false,
    },
    {
      field: 'owner',
      headerName: 'Tenant Owner',
      width: 100,
      editable: true,
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 300,
      editable: true,
    },
  ];

  export const ldapColumns = [
    {
      field: 'email',
      headerName: 'E-mail',
      width: 150,
      editable: false,
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 100,
      editable: true,
    },
    {
      field: 'is_staff',
      headerName: 'Staff?',
      type: 'boolean',
      width: 20,
      editable: true,
    },
    {
      field: 'is_admin',
      headerName: 'Admin?',
      type: 'boolean',
      sortable: true,
      width: 20,
    },
    {
      field: 'is_active',
      headerName: 'Enabled?',
      type: 'boolean',
      sortable: true,
      width: 20,
    },
    {
      field: 'is_tenant_admin',
      headerName: 'Tenant Admin?',
      type: 'boolean',
      sortable: true,
      width: 20,
    },
    {
      field: 'tenant',
      headerName: 'Tenant',
      sortable: true,
      width: 50,
    },
    {
      field: 'phone',
      headerName: 'Phone',
      type: 'boolean',
      sortable: true,
      width: 50,
    },
    {
      field: 'location',
      headerName: 'Location',
      sortable: true,
      width: 200,
    },
  ];

  export const serverColumns = [
    {
      field: 'email',
      headerName: 'E-mail',
      width: 150,
      editable: false,
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 100,
      editable: true,
    },
    {
      field: 'is_staff',
      headerName: 'Staff?',
      type: 'boolean',
      width: 20,
      editable: true,
    },
    {
      field: 'is_admin',
      headerName: 'Admin?',
      type: 'boolean',
      sortable: true,
      width: 20,
    },
    {
      field: 'is_active',
      headerName: 'Enabled?',
      type: 'boolean',
      sortable: true,
      width: 20,
    },
    {
      field: 'is_tenant_admin',
      headerName: 'Tenant Admin?',
      type: 'boolean',
      sortable: true,
      width: 20,
    },
    {
      field: 'tenant',
      headerName: 'Tenant',
      sortable: true,
      width: 50,
    },
    {
      field: 'phone',
      headerName: 'Phone',
      type: 'boolean',
      sortable: true,
      width: 50,
    },
    {
      field: 'location',
      headerName: 'Location',
      sortable: true,
      width: 200,
    },
  ];

  export const applianceColumns = [
    {
      field: 'email',
      headerName: 'E-mail',
      width: 150,
      editable: false,
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 100,
      editable: true,
    },
    {
      field: 'is_staff',
      headerName: 'Staff?',
      type: 'boolean',
      width: 20,
      editable: true,
    },
    {
      field: 'is_admin',
      headerName: 'Admin?',
      type: 'boolean',
      sortable: true,
      width: 20,
    },
    {
      field: 'is_active',
      headerName: 'Enabled?',
      type: 'boolean',
      sortable: true,
      width: 20,
    },
    {
      field: 'is_tenant_admin',
      headerName: 'Tenant Admin?',
      type: 'boolean',
      sortable: true,
      width: 20,
    },
    {
      field: 'tenant',
      headerName: 'Tenant',
      sortable: true,
      width: 50,
    },
    {
      field: 'phone',
      headerName: 'Phone',
      type: 'boolean',
      sortable: true,
      width: 50,
    },
    {
      field: 'location',
      headerName: 'Location',
      sortable: true,
      width: 200,
    },
  ];

  export const networkColumns = [
    {
      field: 'email',
      headerName: 'E-mail',
      width: 150,
      editable: false,
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 100,
      editable: true,
    },
    {
      field: 'is_staff',
      headerName: 'Staff?',
      type: 'boolean',
      width: 20,
      editable: true,
    },
    {
      field: 'is_admin',
      headerName: 'Admin?',
      type: 'boolean',
      sortable: true,
      width: 20,
    },
    {
      field: 'is_active',
      headerName: 'Enabled?',
      type: 'boolean',
      sortable: true,
      width: 20,
    },
    {
      field: 'is_tenant_admin',
      headerName: 'Tenant Admin?',
      type: 'boolean',
      sortable: true,
      width: 20,
    },
    {
      field: 'tenant',
      headerName: 'Tenant',
      sortable: true,
      width: 50,
    },
    {
      field: 'phone',
      headerName: 'Phone',
      type: 'boolean',
      sortable: true,
      width: 50,
    },
    {
      field: 'location',
      headerName: 'Location',
      sortable: true,
      width: 200,
    },
  ];

  export const cloudColumns = [
    {
      field: 'email',
      headerName: 'E-mail',
      width: 150,
      editable: false,
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 100,
      editable: true,
    },
    {
      field: 'is_staff',
      headerName: 'Staff?',
      type: 'boolean',
      width: 20,
      editable: true,
    },
    {
      field: 'is_admin',
      headerName: 'Admin?',
      type: 'boolean',
      sortable: true,
      width: 20,
    },
    {
      field: 'is_active',
      headerName: 'Enabled?',
      type: 'boolean',
      sortable: true,
      width: 20,
    },
    {
      field: 'is_tenant_admin',
      headerName: 'Tenant Admin?',
      type: 'boolean',
      sortable: true,
      width: 20,
    },
    {
      field: 'tenant',
      headerName: 'Tenant',
      sortable: true,
      width: 50,
    },
    {
      field: 'phone',
      headerName: 'Phone',
      type: 'boolean',
      sortable: true,
      width: 50,
    },
    {
      field: 'location',
      headerName: 'Location',
      sortable: true,
      width: 200,
    },
  ];