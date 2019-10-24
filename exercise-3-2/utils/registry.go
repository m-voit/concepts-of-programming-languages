package utils

// Registry :
type Registry struct {
	services map[string]interface{}
}

// NewRegistry :
func NewRegistry() *Registry {
	registry := new(Registry)
	registry.services = make(map[string]interface{})

	return registry
}

// Register :
func (s *Registry) Register(name string, registerInterface interface{}) {
	s.services[name] = registerInterface
}

// Get :
func (s *Registry) Get(name string) interface{} {
	result := s.services[name]

	return result
}
