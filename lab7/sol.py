import sys
import angr

def success_condition(state):
    return b"Login successful" in state.posix.dumps(sys.stdout.fileno())

def failure_condition(state):
    return b"Login failed" in state.posix.dumps(sys.stdout.fileno())

if __name__ == '__main__':
    proj = angr.Project("./login")
    initial_state = proj.factory.entry_state()
    simulation = proj.factory.simgr(initial_state)
    simulation.explore(find=success_condition, avoid=failure_condition)
    if simulation.found:
        solution_state = simulation.found[0]
        print(solution_state.posix.dumps(sys.stdin.fileno()))
    else:
        print("Solution not found")