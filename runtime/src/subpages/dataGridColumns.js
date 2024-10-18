

export const userColumns = [
    {
      field: 'email',
      headerName: 'E-mail',
      flex: 1,
      editable: false,
    },
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      editable: true,
    },
    {
      field: 'is_staff',
      headerName: 'Staff?',
      type: 'boolean',
      flex: 1,
      editable: true,
    },
    {
      field: 'is_admin',
      headerName: 'Admin?',
      type: 'boolean',
      sortable: true,
      flex: 1,
    },
    {
      field: 'is_active',
      headerName: 'Enabled?',
      type: 'boolean',
      sortable: true,
      flex: 1,
    },
    {
      field: 'is_tenant_admin',
      headerName: 'Tenant Admin?',
      type: 'boolean',
      sortable: true,
      flex: 1,
    },
    {
      field: 'tenant',
      headerName: 'Tenant',
      sortable: true,
      flex: 1,
    },
    {
      field: 'phone',
      headerName: 'Phone',
      sortable: true,
      flex: 1,
    },
    {
      field: 'location',
      headerName: 'Location',
      sortable: true,
      flex: 1,
    },
  ];

  export const groupColumns = [
    { field: 'id', headerName: 'Group ID', flex: 1, editable: false, },    
    { field: 'group_name', headerName: 'Group Name', flex: 1, editable: false, },
    { field: 'desc', headerName: 'Description?', flex: 1, editable: true, },
    { field: 'ldap_map', headerName: 'Mapped to LDAP Group', flex: 1, editable: false, },
    { field: 'ad_map', headerName: 'Mapped to AD Group', flex: 1, editable: false, },
  ];

  export const tenantColumns = [
    { field: 'name', headerName: 'Tenant Name', flex: 1, editable: false, },
    { field: 'owner', headerName: 'Tenant Owner', flex: 1, editable: true, },
    { field: 'description', headerName: 'Description', flex: 1, editable: true, },
  ];

  export const ldapColumns = [
    { field: 'email', headerName: 'E-mail', flex: 1, editable: false, },
    { field: 'name', headerName: 'Name', flex: 1, editable: true, },
    { field: 'is_staff', headerName: 'Staff?', type: 'boolean', flex: 1, editable: true, },
    { field: 'is_admin', headerName: 'Admin', type: 'boolean', sortable: true, flex: 1, },
    { field: 'is_active', headerName: 'Enabled', type: 'boolean', sortable: true, flex: 1, },
    { field: 'is_tenant_admin', headerName: 'Tenant Admin', type: 'boolean', sortable: true, flex: 1, },
    { field: 'tenant', headerName: 'Tenant', sortable: true, flex: 1, },
    { field: 'phone', headerName: 'Phone', type: 'boolean', sortable: true, flex: 1, },
    { field: 'location', headerName: 'Location', sortable: true, flex: 1, },
  ];

  export const serverColumns = [
    { field: 'sname', headerName: 'Server Name', flex: 1, editable: false, },
    { field: 'ip', headerName: 'IP Address', flex: 1, },
    { field: 'description', headerName: 'Description', flex: 1, },
    { field: 'term_ip', headerName: 'Terminal IP', sortable: true, flex: 1, },
    { field: 'o_s', headerName: 'Operating System', sortable: true, flex: 1, },
    { field: 'serial', headerName: 'Serial Number', sortable: true, flex: 1, },
    { field: 'hw_vendor', headerName: 'Hardware Vendor', sortable: true, flex: 1, },
    { field: 'hw_type', headerName: 'Hardware Type', sortable: true, flex: 1, },
    { field: 'cpu_count', headerName: 'CPU Type/Count', flex: 1, },
    { field: 'memory', headerName: 'Memory', flex: 1, },
    { field: 'datacenter', headerName: 'Datacenter/Location', sortable: true, flex: 1, },
    { field: 'dc_row', headerName: 'Datacenter Row/Cage', sortable: true, flex: 1, },
    { field: 'dc_rack', headerName: 'Rack Number', sortable: true, flex: 1, },
    { field: 'dc_u_num', headerName: 'U-Number in Rack', sortable: true, flex: 1, },
    { field: 'virtual', headerName: 'Virtual', sortable: true, flex: 1, },
  ];

  export const applianceColumns = [
    { field: 'aname', headerName: 'Appliance Name', flex: 1, editable: false, },
    { field: 'type', headerName: 'Appliance type', flex: 1, editable: true, },
    { field: 'pri_ip', headerName: 'Primary IP', flex: 1, },
    { field: 'sec_ip', headerName: 'Secondary IP', sortable: true, flex: 1, },
    { field: 'term_ip', headerName: 'Terminal IP', sortable: true, flex: 1, },
    { field: 'serial', headerName: 'Serial Number', sortable: true, flex: 1, },
    { field: 'hw_vendor', headerName: 'Hardware Vendor', sortable: true, flex: 1, },
    { field: 'hw_type', headerName: 'Hardware Type', sortable: true, flex: 1, },
    { field: 'datacenter', headerName: 'Datacenter/Location', sortable: true, flex: 1, },
    { field: 'dc_row', headerName: 'Datacenter Row/Cage', sortable: true, flex: 1, },
    { field: 'dc_rack', headerName: 'Rack Number', sortable: true, flex: 1, },
    { field: 'dc_u_num', headerName: 'U-Number in Rack', sortable: true, flex: 1, },
    { field: 'virtual', headerName: 'Virtual', sortable: true, flex: 1, },
  ]; 

  export const networkColumns = [
    { field: 'subnet', headerName: 'Subnet', flex: 1, editable: false, },
    { field: 'vlan_id', headerName: 'VLAN ID or Number', flex: 1, editable: true, },
    { field: 'public', headerName: 'Public', type: 'boolean', flex: 1, editable: true, },
    { field: 'firewalled', headerName: 'Firewalled', type: 'boolean', sortable: true, flex: 1, },
    { field: 'proxy', headerName: 'Proxy', sortable: true, flex: 1, },
  ];

  export const cloudColumns = [
    { field: 'vendor', headerName: 'Cloud Vendor', flex: 1, editable: false, },
    { field: 'login', headerName: 'Access Login', flex: 1, editable: true, },
    { field: 'password', headerName: 'Password', flex: 1, editable: true, },
    { field: 'terraform', headerName: 'Use Terraform', type: 'boolean', sortable: true, flex: 1, },
    { field: 'api_only', headerName: 'Use API Only', type: 'boolean', sortable: true, flex: 1, },
  ];
