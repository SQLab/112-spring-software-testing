import angr, sys

def success(state: angr.SimState) -> bool:
    return b'Login successful' in state.posix.dumps(sys.stdout.fileno())

def fail(state: angr.SimState) -> bool:
    return b'Login failed' in state.posix.dumps(sys.stdout.fileno())

def main() -> None:
    proj = angr.Project('./login')
    init_state = proj.factory.entry_state()
    simulation = proj.factory.simulation_manager(init_state)
    simulation.explore(find=success, avoid=fail)
    solution = simulation.found[0]
    print(solution.posix.dumps(sys.stdin.fileno()))

if __name__ == '__main__':
    main()
