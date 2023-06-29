import React from 'react';
import './PsychologistsForm.css';
import '../../PageHeader.css';

import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

import BaseButton from '../../../Components/BaseButton/BaseButton';
import BaseInput from '../../../Components/BaseInput/BaseInput';

import api from '../../../Services/api';

const PsychologistsView = () => {
  const navigate = useNavigate();
  const [changingHeader] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'psychologist',
    cpf: '',
    crp: '',
  });

  async function handleSubmitForm() {
    try {
      await api.post('/users/psychologists', formData);
      navigate('/user/psychologists');
    } catch (error) {
      console.log(error);
      console.error(error.response.data);
    }
  }

  const handleChange = (name, value) => {
    setFormData((prevData) => ({...prevData, [name]: value}));
  };

  function getHeaderTextClass() {
    if (changingHeader) return 'text-leave';
    else return 'text-enter';
  }

  return (
    <div className="form-container">
      <header className="page-header">
        <div className="d-flex inline-block row">
          <h1 className={`header-title ${getHeaderTextClass()}`}>
            <i className="fas fa-plus page-icon" /> <span>Novo Psicólogo</span>
          </h1>
        </div>
      </header>

      <div className="page-body">
        <div className="d-flex row">
          <div className="col-md-12">
            <h2 className='text-bolder'>Perfil:</h2>
          </div>
          <div className="col-md-6">
            <BaseInput
              value={formData.email}
              setValue={(value) => handleChange('email', value)}
              placeholder={'Email'}
              label={'Email'}
              icon="fas fa-envelope"
              type="email"
            />
          </div>
          <div className="col-md-6"> </div>

          <div className="col-md-6 mt--2">
            <BaseInput
              value={formData.password}
              setValue={(value) => handleChange('password', value)}
              placeholder={'Senha'}
              icon="fas fa-lock"
              label={'Senha'}
              type="password"
            />
          </div>
          <div className="col-md-6"> </div>

          <div className="col-md-12 mt-4">
            <h2 className='text-bolder'>Dados Pessoais:</h2>
          </div>
          <div className="col-lg-4">
            <BaseInput
              value={formData.name}
              setValue={(value) => handleChange('name', value)}
              placeholder={'Nome'}
              icon="fas fa-user"
              label={'Nome'}
              type={'input'}
            />
          </div>
          <div className="col-lg-4">
            <BaseInput
              mask="999.999.999-99"
              value={formData.cpf}
              setValue={(value) => handleChange('cpf', value)}
              placeholder={'CPF'}
              icon="fas fa-id-card"
              label={'CPF'}
              type={'input'}
            />
          </div>
          <div className="col-lg-4">
            <BaseInput
              mask="99/99999"
              value={formData.crp}
              setValue={(value) => handleChange('crp', value)}
              placeholder={'CRP'}
              icon="fas fa-id-badge"
              label={'CRP'}
              type={'input'}
            />
          </div>

          <div className="col-12 submit-session">
            <BaseButton type="primary-black" onClick={handleSubmitForm}>
              <i className="button-icon fas fa-check " /> Salvar Perfil
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PsychologistsView;
