import { ref } from 'vue'
import { useRouter } from 'vue-router'

export function useAuth() {
  const router = useRouter()
  
  const isSubmitting = ref(false)
  const errorMessage = ref('')

  // Validações
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePassword = (password) => {
    return password.length >= 6
  }

  const validatePasswordMatch = (password, confirmPassword) => {
    return password === confirmPassword
  }

  const validateCargo = (cargo) => {
    const cargosPermitidos = ['administrativo']
    return cargosPermitidos.includes(cargo)
  }

  // Login (mock - valida contra localStorage)
  const login = async (credentials) => {
    console.log('🔵 Login iniciado com:', credentials)
    errorMessage.value = ''
    isSubmitting.value = true

    try {
      // Simular delay de rede
      await new Promise(resolve => setTimeout(resolve, 800))

      // Validar email
      if (!validateEmail(credentials.email)) {
        throw new Error('E-mail inválido')
      }
      console.log('✅ Email válido')

      // Validar senha
      if (!validatePassword(credentials.password)) {
        throw new Error('Senha deve ter no mínimo 6 caracteres')
      }
      console.log('✅ Senha válida')

      // Buscar usuário do localStorage
      const usuariosCadastrados = JSON.parse(localStorage.getItem('usuarios') || '[]')
      console.log('📦 Usuários cadastrados:', usuariosCadastrados)
      
      const usuario = usuariosCadastrados.find(u => u.email === credentials.email)
      console.log('👤 Usuário encontrado:', usuario)

      if (!usuario) {
        throw new Error('Usuário não encontrado. Você precisa se cadastrar primeiro.')
      }

      if (usuario.senha !== credentials.password) {
        throw new Error('Senha incorreta.')
      }

      console.log('✅ Credenciais corretas!')

      // Salvar sessão
      localStorage.setItem('usuario', JSON.stringify(usuario))
      localStorage.setItem('token', 'mock-token-' + Date.now())
      console.log('💾 Sessão salva')

      // Redirecionar
      console.log('🚀 Redirecionando para /dashboard...')
      await router.push('/dashboard')
      console.log('✅ Redirecionado!')

      return { success: true }
    } catch (error) {
      console.error('❌ Erro no login:', error.message)
      errorMessage.value = error.message
      return { success: false, message: error.message }
    } finally {
      isSubmitting.value = false
      console.log('🏁 Login finalizado')
    }
  }

  // Registro (mock - salva no localStorage)
  const register = async (userData) => {
    errorMessage.value = ''
    isSubmitting.value = true

    try {
      // Simular delay de rede
      await new Promise(resolve => setTimeout(resolve, 800))

      // Validar email
      if (!validateEmail(userData.email)) {
        throw new Error('E-mail inválido')
      }

      // Validar senha
      if (!validatePassword(userData.senha)) {
        throw new Error('Senha deve ter no mínimo 6 caracteres')
      }

      // Validar confirmação de senha
      if (!validatePasswordMatch(userData.senha, userData.confirmarSenha)) {
        throw new Error('As senhas não coincidem')
      }

      // Verificar se email já existe
      const usuariosCadastrados = JSON.parse(localStorage.getItem('usuarios') || '[]')
      const emailExiste = usuariosCadastrados.some(u => u.email === userData.email)
      
      if (emailExiste) {
        throw new Error('Este e-mail já está cadastrado')
      }

      // Validar cargo
      if (!validateCargo(userData.cargo)) {
        return {
          success: false,
          message: 'Apenas cargos administrativos têm acesso ao dashboard no momento.',
          field: 'cargo'
        }
      }

      // Criar novo usuário
      const novoUsuario = {
        id: Date.now(),
        nome: userData.nome,
        email: userData.email,
        cargo: userData.cargo,
        hospital: userData.hospital,
        senha: userData.senha,
        foto: '',
        criadoEm: new Date().toISOString()
      }

      // Salvar no array de usuários
      usuariosCadastrados.push(novoUsuario)
      localStorage.setItem('usuarios', JSON.stringify(usuariosCadastrados))

      // Salvar sessão do usuário (sem senha)
      const { senha, ...usuarioSemSenha } = novoUsuario
      localStorage.setItem('usuario', JSON.stringify(usuarioSemSenha))
      localStorage.setItem('token', 'mock-token-' + Date.now())

      // Redirecionar
      await router.push('/dashboard')

      return { success: true }
    } catch (error) {
      errorMessage.value = error.message
      return { success: false, message: error.message }
    } finally {
      isSubmitting.value = false
    }
  }

  // Logout
  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
    router.push('/')
  }

  return {
    isSubmitting,
    errorMessage,
    login,
    register,
    logout,
    validateEmail,
    validatePassword,
    validatePasswordMatch,
    validateCargo
  }
}