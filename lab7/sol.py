import angr ,sys 

proj = angr.Project('./login') ## create a angr.Project object

def success_condition(state):
	return b"Login successful" in state.posix.dumps(sys.stdout.fileno())

def fail_condition(state):
	return b"Login failed" in state.posix.dumps(sys.stdout.fileno())

init_state = proj.factory.entry_state() ## initialize

simulation = proj.factory.simgr(init_state)

simulation.explore( find = success_condition,avoid=fail_condition)

print(simulation.found[0].posix.dumps(sys.stdin.fileno()))
