import {useState} from 'react'
import styles from './ProjectForm.module.css'
import Input from '../form/Input'
import SubmitButton from '../form/SubmitButton'


function ServiceForm({handleSubmit, btn, projectData}){
    
    const [service, setService] = useState({})

    function submit(e){
        e.preventDefault()
        projectData.services.push(service)
        handleSubmit(projectData)
    }

    function handleChange(e){
        setService({ ...service, [e.target.name]: e.target.value})
    }
    
    return(
        <form onSubmit={submit} className={styles.form}>
            <Input
                type='text'
                text='Nome do Serviço'
                name='name'
                placeholder='Insira o nome do serviço'
                handleOnChange={handleChange}
            />
            <Input
                type='number'
                text='Custo do serviço'
                name='cost'
                placeholder='Insira o valor total'
                handleOnChange={handleChange}
            />
            <Input
                type='text'
                text='Descirção do Serviço'
                name='description'
                placeholder='Insira a descrição do serviço'
                handleOnChange={handleChange}
            />

            <SubmitButton text={btn}/>
        </form>
    )
}

export default ServiceForm 