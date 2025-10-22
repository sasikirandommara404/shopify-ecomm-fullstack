import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function UserProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    phone: '+1 (555) 123-4567',
    email: 'john.doe@example.com',
    address: {
      street: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA'
    }
  });

  const [tempData, setTempData] = useState({ ...userData });

  const handleEdit = () => {
    setTempData({ ...userData });
    setIsEditing(true);
  };

  const handleSave = () => {
    setUserData({ ...tempData });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempData({ ...userData });
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setTempData(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [name]: value
      }
    }));
  };

  const displayData = isEditing ? tempData : userData;
  const fullName = `${displayData.firstName} ${displayData.lastName}`;

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5', padding: '40px 20px' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10 col-xl-8">
            
            {/* Header Card */}
            <div style={{
              background: '#ffffff',
              borderRadius: '4px',
              marginBottom: '24px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1), 0 8px 16px rgba(0,0,0,0.1)',
              overflow: 'hidden'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
                padding: '48px 32px',
                textAlign: 'center'
              }}>
                <div style={{
                  width: '96px',
                  height: '96px',
                  borderRadius: '50%',
                  background: '#ffffff',
                  color: '#1976d2',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '36px',
                  fontWeight: '500',
                  marginBottom: '16px',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                }}>
                  {userData.firstName.charAt(0)}{userData.lastName.charAt(0)}
                </div>
                <h2 style={{ color: '#ffffff', fontWeight: '400', fontSize: '28px', marginBottom: '8px' }}>
                  {userData.firstName} {userData.lastName}
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.9)', margin: 0, fontSize: '16px' }}>
                  {userData.email}
                </p>
              </div>
            </div>

            {/* Profile Details Card */}
            <div style={{
              background: '#ffffff',
              borderRadius: '4px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1), 0 8px 16px rgba(0,0,0,0.1)',
              overflow: 'hidden'
            }}>
              
              {/* Card Header */}
              <div style={{
                padding: '24px 32px',
                borderBottom: '1px solid #e0e0e0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <h3 style={{ margin: 0, fontWeight: '400', fontSize: '20px', color: '#212121' }}>
                  Profile Information
                </h3>
                {!isEditing ? (
                  <button 
                    onClick={handleEdit}
                    style={{
                      background: '#1976d2',
                      color: '#ffffff',
                      border: 'none',
                      padding: '10px 24px',
                      borderRadius: '4px',
                      fontSize: '14px',
                      fontWeight: '500',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                      transition: 'all 0.3s'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.background = '#1565c0';
                      e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.3)';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.background = '#1976d2';
                      e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
                    }}
                  >
                    Edit
                  </button>
                ) : (
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button 
                      onClick={handleSave}
                      style={{
                        background: '#4caf50',
                        color: '#ffffff',
                        border: 'none',
                        padding: '10px 24px',
                        borderRadius: '4px',
                        fontSize: '14px',
                        fontWeight: '500',
                        textTransform: 'uppercase',
                        cursor: 'pointer',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                        transition: 'all 0.3s'
                      }}
                      onMouseOver={(e) => e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.3)'}
                      onMouseOut={(e) => e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)'}
                    >
                      Save
                    </button>
                    <button 
                      onClick={handleCancel}
                      style={{
                        background: '#757575',
                        color: '#ffffff',
                        border: 'none',
                        padding: '10px 24px',
                        borderRadius: '4px',
                        fontSize: '14px',
                        fontWeight: '500',
                        textTransform: 'uppercase',
                        cursor: 'pointer',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                        transition: 'all 0.3s'
                      }}
                      onMouseOver={(e) => e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.3)'}
                      onMouseOut={(e) => e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)'}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              {/* Card Content */}
              <div style={{ padding: '32px' }}>
                
                {/* Personal Information */}
                <div style={{ marginBottom: '32px' }}>
                  <h4 style={{ 
                    color: '#1976d2', 
                    fontSize: '14px', 
                    fontWeight: '500', 
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    marginBottom: '24px' 
                  }}>
                    Personal Details
                  </h4>
                  <div className="row g-4">
                    {!isEditing ? (
                      <div className="col-12">
                        <label style={{ 
                          display: 'block',
                          color: '#757575', 
                          fontSize: '12px', 
                          fontWeight: '500',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                          marginBottom: '8px' 
                        }}>
                          Full Name
                        </label>
                        <p style={{ 
                          color: '#212121', 
                          fontSize: '16px', 
                          margin: 0,
                          padding: '12px 0',
                          borderBottom: '1px solid #e0e0e0'
                        }}>
                          {fullName}
                        </p>
                      </div>
                    ) : (
                      <>
                        <div className="col-md-6">
                          <label style={{ 
                            display: 'block',
                            color: '#757575', 
                            fontSize: '12px', 
                            fontWeight: '500',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                            marginBottom: '8px' 
                          }}>
                            First Name
                          </label>
                          <input
                            type="text"
                            name="firstName"
                            value={displayData.firstName}
                            onChange={handleInputChange}
                            style={{
                              width: '100%',
                              padding: '12px 16px',
                              border: 'none',
                              borderBottom: '2px solid #e0e0e0',
                              fontSize: '16px',
                              color: '#212121',
                              background: 'transparent',
                              outline: 'none',
                              transition: 'border-color 0.3s'
                            }}
                            onFocus={(e) => e.target.style.borderBottomColor = '#1976d2'}
                            onBlur={(e) => e.target.style.borderBottomColor = '#e0e0e0'}
                          />
                        </div>
                        <div className="col-md-6">
                          <label style={{ 
                            display: 'block',
                            color: '#757575', 
                            fontSize: '12px', 
                            fontWeight: '500',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                            marginBottom: '8px' 
                          }}>
                            Last Name
                          </label>
                          <input
                            type="text"
                            name="lastName"
                            value={displayData.lastName}
                            onChange={handleInputChange}
                            style={{
                              width: '100%',
                              padding: '12px 16px',
                              border: 'none',
                              borderBottom: '2px solid #e0e0e0',
                              fontSize: '16px',
                              color: '#212121',
                              background: 'transparent',
                              outline: 'none',
                              transition: 'border-color 0.3s'
                            }}
                            onFocus={(e) => e.target.style.borderBottomColor = '#1976d2'}
                            onBlur={(e) => e.target.style.borderBottomColor = '#e0e0e0'}
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Contact Information */}
                <div style={{ marginBottom: '32px' }}>
                  <h4 style={{ 
                    color: '#1976d2', 
                    fontSize: '14px', 
                    fontWeight: '500', 
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    marginBottom: '24px' 
                  }}>
                    Contact Information
                  </h4>
                  <div className="row g-4">
                    <div className="col-md-6">
                      <label style={{ 
                        display: 'block',
                        color: '#757575', 
                        fontSize: '12px', 
                        fontWeight: '500',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        marginBottom: '8px' 
                      }}>
                        Email Address
                      </label>
                      {isEditing ? (
                        <input
                          type="email"
                          name="email"
                          value={displayData.email}
                          onChange={handleInputChange}
                          style={{
                            width: '100%',
                            padding: '12px 16px',
                            border: 'none',
                            borderBottom: '2px solid #e0e0e0',
                            fontSize: '16px',
                            color: '#212121',
                            background: 'transparent',
                            outline: 'none',
                            transition: 'border-color 0.3s'
                          }}
                          onFocus={(e) => e.target.style.borderBottomColor = '#1976d2'}
                          onBlur={(e) => e.target.style.borderBottomColor = '#e0e0e0'}
                        />
                      ) : (
                        <p style={{ 
                          color: '#212121', 
                          fontSize: '16px', 
                          margin: 0,
                          padding: '12px 0',
                          borderBottom: '1px solid #e0e0e0'
                        }}>
                          {displayData.email}
                        </p>
                      )}
                    </div>
                    <div className="col-md-6">
                      <label style={{ 
                        display: 'block',
                        color: '#757575', 
                        fontSize: '12px', 
                        fontWeight: '500',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        marginBottom: '8px' 
                      }}>
                        Phone Number
                      </label>
                      {isEditing ? (
                        <input
                          type="tel"
                          name="phone"
                          value={displayData.phone}
                          onChange={handleInputChange}
                          style={{
                            width: '100%',
                            padding: '12px 16px',
                            border: 'none',
                            borderBottom: '2px solid #e0e0e0',
                            fontSize: '16px',
                            color: '#212121',
                            background: 'transparent',
                            outline: 'none',
                            transition: 'border-color 0.3s'
                          }}
                          onFocus={(e) => e.target.style.borderBottomColor = '#1976d2'}
                          onBlur={(e) => e.target.style.borderBottomColor = '#e0e0e0'}
                        />
                      ) : (
                        <p style={{ 
                          color: '#212121', 
                          fontSize: '16px', 
                          margin: 0,
                          padding: '12px 0',
                          borderBottom: '1px solid #e0e0e0'
                        }}>
                          {displayData.phone}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Address Information */}
                <div>
                  <h4 style={{ 
                    color: '#1976d2', 
                    fontSize: '14px', 
                    fontWeight: '500', 
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    marginBottom: '24px' 
                  }}>
                    Address
                  </h4>
                  <div className="row g-4">
                    <div className="col-12">
                      <label style={{ 
                        display: 'block',
                        color: '#757575', 
                        fontSize: '12px', 
                        fontWeight: '500',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        marginBottom: '8px' 
                      }}>
                        Street Address
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="street"
                          value={displayData.address.street}
                          onChange={handleAddressChange}
                          style={{
                            width: '100%',
                            padding: '12px 16px',
                            border: 'none',
                            borderBottom: '2px solid #e0e0e0',
                            fontSize: '16px',
                            color: '#212121',
                            background: 'transparent',
                            outline: 'none',
                            transition: 'border-color 0.3s'
                          }}
                          onFocus={(e) => e.target.style.borderBottomColor = '#1976d2'}
                          onBlur={(e) => e.target.style.borderBottomColor = '#e0e0e0'}
                        />
                      ) : (
                        <p style={{ 
                          color: '#212121', 
                          fontSize: '16px', 
                          margin: 0,
                          padding: '12px 0',
                          borderBottom: '1px solid #e0e0e0'
                        }}>
                          {displayData.address.street}
                        </p>
                      )}
                    </div>
                    <div className="col-md-6">
                      <label style={{ 
                        display: 'block',
                        color: '#757575', 
                        fontSize: '12px', 
                        fontWeight: '500',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        marginBottom: '8px' 
                      }}>
                        City
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="city"
                          value={displayData.address.city}
                          onChange={handleAddressChange}
                          style={{
                            width: '100%',
                            padding: '12px 16px',
                            border: 'none',
                            borderBottom: '2px solid #e0e0e0',
                            fontSize: '16px',
                            color: '#212121',
                            background: 'transparent',
                            outline: 'none',
                            transition: 'border-color 0.3s'
                          }}
                          onFocus={(e) => e.target.style.borderBottomColor = '#1976d2'}
                          onBlur={(e) => e.target.style.borderBottomColor = '#e0e0e0'}
                        />
                      ) : (
                        <p style={{ 
                          color: '#212121', 
                          fontSize: '16px', 
                          margin: 0,
                          padding: '12px 0',
                          borderBottom: '1px solid #e0e0e0'
                        }}>
                          {displayData.address.city}
                        </p>
                      )}
                    </div>
                    <div className="col-md-3">
                      <label style={{ 
                        display: 'block',
                        color: '#757575', 
                        fontSize: '12px', 
                        fontWeight: '500',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        marginBottom: '8px' 
                      }}>
                        State
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="state"
                          value={displayData.address.state}
                          onChange={handleAddressChange}
                          style={{
                            width: '100%',
                            padding: '12px 16px',
                            border: 'none',
                            borderBottom: '2px solid #e0e0e0',
                            fontSize: '16px',
                            color: '#212121',
                            background: 'transparent',
                            outline: 'none',
                            transition: 'border-color 0.3s'
                          }}
                          onFocus={(e) => e.target.style.borderBottomColor = '#1976d2'}
                          onBlur={(e) => e.target.style.borderBottomColor = '#e0e0e0'}
                        />
                      ) : (
                        <p style={{ 
                          color: '#212121', 
                          fontSize: '16px', 
                          margin: 0,
                          padding: '12px 0',
                          borderBottom: '1px solid #e0e0e0'
                        }}>
                          {displayData.address.state}
                        </p>
                      )}
                    </div>
                    <div className="col-md-3">
                      <label style={{ 
                        display: 'block',
                        color: '#757575', 
                        fontSize: '12px', 
                        fontWeight: '500',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        marginBottom: '8px' 
                      }}>
                        ZIP Code
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="zipCode"
                          value={displayData.address.zipCode}
                          onChange={handleAddressChange}
                          style={{
                            width: '100%',
                            padding: '12px 16px',
                            border: 'none',
                            borderBottom: '2px solid #e0e0e0',
                            fontSize: '16px',
                            color: '#212121',
                            background: 'transparent',
                            outline: 'none',
                            transition: 'border-color 0.3s'
                          }}
                          onFocus={(e) => e.target.style.borderBottomColor = '#1976d2'}
                          onBlur={(e) => e.target.style.borderBottomColor = '#e0e0e0'}
                        />
                      ) : (
                        <p style={{ 
                          color: '#212121', 
                          fontSize: '16px', 
                          margin: 0,
                          padding: '12px 0',
                          borderBottom: '1px solid #e0e0e0'
                        }}>
                          {displayData.address.zipCode}
                        </p>
                      )}
                    </div>
                    <div className="col-12">
                      <label style={{ 
                        display: 'block',
                        color: '#757575', 
                        fontSize: '12px', 
                        fontWeight: '500',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        marginBottom: '8px' 
                      }}>
                        Country
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="country"
                          value={displayData.address.country}
                          onChange={handleAddressChange}
                          style={{
                            width: '100%',
                            padding: '12px 16px',
                            border: 'none',
                            borderBottom: '2px solid #e0e0e0',
                            fontSize: '16px',
                            color: '#212121',
                            background: 'transparent',
                            outline: 'none',
                            transition: 'border-color 0.3s'
                          }}
                          onFocus={(e) => e.target.style.borderBottomColor = '#1976d2'}
                          onBlur={(e) => e.target.style.borderBottomColor = '#e0e0e0'}
                        />
                      ) : (
                        <p style={{ 
                          color: '#212121', 
                          fontSize: '16px', 
                          margin: 0,
                          padding: '12px 0',
                          borderBottom: '1px solid #e0e0e0'
                        }}>
                          {displayData.address.country}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}